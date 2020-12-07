import React, {useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { AddDialog } from "./Dialog";
import { DraggableList } from "./List/List";

const Sheet = ({
  pageId,
  sheet,
  lists,
  items,
  addList,
  deleteSheet,
  loading,
  ...rest
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
      height: "80vh",
      padding: theme.spacing(5, 0),
      backgroundColor: theme.palette.secondary.main
    },
    grid: { padding: theme.spacing(1, 3) },
    addButton: {
      position: "absolute",
      bottom: "10vh",
      right: "5vh",
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    hide: {
      display: "none",
    },
  }));
  const classes = useStyles();
  const [bottomItem, setBottomItem] = useState(0);

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.closeButton}
        aria-label="delete"
        onClick={() => deleteSheet({ pageId, sheetId: sheet._id })}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.grid}
      >
        {lists && lists.length > 0 ? (
          lists.map((list) => {
            const listObj = items.find((itemObj) => itemObj._id === list._id);
            const listItems = listObj ? listObj.items : [];
            return (
              <Grid item key={list._id} className={classes.gridItem}>
                <DraggableList
                  sheetId={sheet._id}
                  listId={list._id}
                  list={list}
                  header={list.name}
                  items={listItems}
                  bottomItem={bottomItem}
                  setBottomItem={setBottomItem}
                  {...rest}
                />
              </Grid>
            );
          })
        ) : (
          <div style={{ marginTop: "30vh" }}>
            {loading ? (
              <CircularProgress size={"20vh"} />
            ) : (
              <Typography align="center" variant="h3">
                Lists do not yet exist
              </Typography>
            )}
          </div>
        )}
      </Grid>
      <div className={classes.addButton}>
        <AddDialog
          header="Add List"
          fields={{ "List Name": "name" }}
          addFunction={addList}
          body={{ pageId: sheet._id }}
        />
      </div>
    </div>
  );
};

Sheet.propTypes = {
  pageId: PropTypes.string.isRequired,
  sheet: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sheets: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sheets: PropTypes.array,
      items: PropTypes.array,
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subItems: PropTypes.array,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  deleteSheet: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
};

export default Sheet;
