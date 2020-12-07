import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import {
  getSheets,
  addSheet,
  editSheet,
  deleteSheet,
  changeSheet,
} from "../../redux/Sheet";
import { getLists, addList, editList, deleteList } from "../../redux/List";
import { addItem, editItem, deleteItem, moveItem } from "../../redux/Item";
import Sheet from "./Sheet";
import { AddDialog } from "./Dialog";
import { Home } from "../home";
import { EditableListItem } from "./List/ListItems";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

const drawerWidth = 240;
const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    button: {
      margin: theme.spacing(0, 1),
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  alignRight:{
    display: "flex",
    marginLeft: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  loggedOutContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 0,
  },
});

class Page extends Component {
  state = {
    editClicked: false,
  };

  componentDidMount() {
    if (this.props.location.pathname !== "/") {
      this.props.getSheets(this.props.pageId);
    }
  }

  setEditClicked = () => {
    this.setState({ editClicked: !this.state.editClicked });
  };

  deleteSheet = (sheetId) => {
    this.props.deleteSheet({
      sheetId,
      pageId: this.props.pageId,
    });
    if (
      sheetId === this.props.activeSheet._id &&
      this.props.sheets.length > 1
    ) {
      this.props.changeSheet({
        activeSheet: this.props.activeSheet,
        sheet: this.props.sheets[1],
        sheets: this.props.sheets,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>        
      {this.props.location.pathname === "/" && !this.props.loggedIn ? (
        <Home />
      ) : (      
        <main
        className={clsx({
          [classes.loggedOutContent]: !this.props.loggedIn,
          [classes.contentShift]: this.props.open,
          [classes.content]: this.props.loggedIn,
        })}
      >
        <div className={classes.drawerHeader} />
        <>
          {this.props.location.pathname === "/" ? (
            <Home />
          ): (
            <div>
              <AppBar
                position="relative"
                className={classes.appBar}
              >
                <Toolbar>
                  {this.props.sheets.length > 0 &&
                    this.props.sheets.map((sheet) => (
                      <div className={classes.appBar.button} key={sheet._id}>
                        <EditableListItem
                          editMode={this.state.editClicked}
                          item={sheet}
                          editFunction={(inputText) =>
                            this.props.editSheet({
                              id: sheet._id,
                              pageId: this.props.pageId,
                              name: inputText,
                            })
                          }
                          deleteFunction={() => this.deleteSheet(sheet._id)}
                          deleteIcon={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => this.deleteSheet(sheet._id)}
                            >
                              <CloseIcon />
                            </IconButton>
                          }
                          handleRedirect={(sheet) =>
                            this.props.changeSheet({
                              activeSheet: this.props.activeSheet,
                              sheet,
                              sheets: this.props.sheets,
                            })
                          }
                          customOnNotEdit={
                            <Button
                              variant="outlined"
                              onClick={() =>
                                this.props.changeSheet({
                                  activeSheet: this.props.activeSheet,
                                  sheet,
                                  sheets: this.props.sheets,
                                })
                              }
                            >
                              {sheet.name}
                            </Button>
                          }
                        />
                      </div>
                    ))}
                  <div className={classes.alignRight}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => this.setEditClicked()}
                    >
                      <EditIcon />
                    </IconButton>
                    <AddDialog
                      header="Add Sheet"
                      fields={{ "Sheet Name": "name" }}
                      addFunction={this.props.addSheet}
                      body={{ pageId: this.props.pageId }}
                    />
                  </div>
                </Toolbar>
              </AppBar>
              {this.props.sheets.length > 0 && this.props.activeSheet? (
                <Sheet
                  pageId={this.props.pageId}
                  sheet={this.props.activeSheet}
                  isDraggable={true}
                  deleteSheet={this.props.deleteSheet}
                  lists={this.props.lists}
                  items={this.props.items}
                  addList={this.props.addList}
                  editList={this.props.editList}
                  deleteList={this.props.deleteList}
                  moveItem={this.props.moveItem}
                  addItem={this.props.addItem}
                  editItem={this.props.editItem}
                  deleteItem={this.props.deleteItem}
                  loading={this.props.listLoading}
                  itemLoading={this.props.itemLoading}
                  listIdLoading={this.props.listIdLoading}
                />
              ) : (            
              <div style={{ marginTop: "30vh" }}>
                {this.props.loading ? <CircularProgress size={"20vh"}/>
                :
                  <Typography align="center" variant="h3" >
                    Sheets do not yet exist
                  </Typography>}
              </div> 
              )}
            </div>
          )} </>
      </main>              
      )}
    </>
    );
  }
}
Page.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.node,
  }).isRequired,
  pageId: PropTypes.string,
  sheets: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sheets: PropTypes.array.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  activeSheet: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sheets: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
  }),
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sheets: PropTypes.array.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subItems: PropTypes.array,
  })).isRequired,
  listLoading: PropTypes.bool.isRequired,
  itemLoading: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  listIdLoading: PropTypes.arrayOf(PropTypes.string).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,

  getSheets: PropTypes.func.isRequired,
  addSheet: PropTypes.func.isRequired,
  editSheet: PropTypes.func.isRequired,
  deleteSheet: PropTypes.func.isRequired,
  changeSheet: PropTypes.func.isRequired,
  getLists: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state.listState);
  // console.log(state.itemState);
  return {
    loggedIn: state.loginState.loggedIn,
    sheets: state.sheetState.sheets,
    activeSheet: state.sheetState.activeSheet,
    lists: state.listState.lists,
    items: state.itemState.items,
    open: state.uiState.menuOpen,
    loading: state.sheetState.loading,
    listLoading: state.listState.loading,
    itemLoading: state.itemState.loading,
    listIdLoading: state.itemState.listIdLoading,
  };
};

const mapDispatchToProps = {
  getSheets,
  addSheet,
  editSheet,
  deleteSheet,
  changeSheet,
  getLists,
  addList,
  editList,
  deleteList,
  moveItem,
  addItem,
  editItem,
  deleteItem,
};

const styledPage = withStyles(styles, { withTheme: true })(Page);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(styledPage)
);
