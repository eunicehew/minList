import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AddDialog } from "../common/Dialog";
import { EditableListItem } from "../common/List/ListItems";

export const LoggedInNav = ({
  pages,
  handleLogout,
  handleRedirect,
  handleHome,
  addPage,
  editPage,
  deletePage,
  username,
  toggleTheme,
  toggleMenu,
  theme,
  open,
  pathname,
}) => {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarCenterHeight: {
      verticalAlign: "middle"
    },
    appBarRight: {
      marginLeft: "auto",
    },
    appBarRightButton: {
      marginLeft: "auto",
      display: "flex",
      paddingRight: theme.spacing(1)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },    
  }));

  const [editClicked, setEditClicked] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" >minList</Typography>
          {pathname !== "/" && 
          <IconButton onClick={handleHome}>
            <HomeIcon />
          </IconButton>
          }
          <div className={classes.appBarRight}>
            <span style={{marginRight: "20px"}} >
              <ThemeSwitch classes={classes} theme={theme} toggleTheme={toggleTheme}/> 
            </span>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {pages.length > 0 &&
            pages.map((page) => {
              return (
                <EditableListItem
                  key={page._id}
                  editMode={editClicked}
                  item={page}
                  editFunction={(inputText) =>
                    editPage({ id: page._id, name: inputText })
                  }
                  deleteFunction={() =>
                    deletePage({ username, pageId: page._id })
                  }
                  deleteIcon={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deletePage({ username, pageId: page._id })}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  handleRedirect={handleRedirect}
                  pathname={pathname}
                />
              );
            })}
        </List>
        <div className={classes.appBarRightButton}>
          <IconButton
            aria-label="edit"
            onClick={() => setEditClicked(!editClicked)}
          >
            <EditIcon />
          </IconButton>
          <AddDialog
            header="Add Page"
            fields={{ "Page Name": "name" }}
            addFunction={addPage}
          />
        </div>
      </Drawer>
    </div>
  );
};

// export const LoggedOutNav = ({ handleLogin, theme, toggleTheme }) => {
//   const useStyles = makeStyles(() => ({
//     appBarCenterHeight: {
//       verticalAlign: "middle"
//     },
//     appBarRight:{
//       marginLeft: "auto"
//     }
//   }))
//   const classes = useStyles();

//   return (
//     <AppBar position="fixed">
//       <Toolbar variant="dense">
//         <Button variant="contained" onClick={handleLogin}>
//           Admin Login
//         </Button>
//         <div className={classes.appBarRight}>
//           <ThemeSwitch classes={classes} theme={theme} toggleTheme={toggleTheme}/> 
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

const ThemeSwitch = ({classes, theme, toggleTheme}) => {
  const NavSwitch = withStyles({
    switchBase: {
      color: '#ace7ff',
      '&$checked': {
        color: '#630c0c',
      },
      '&$checked + $track': {
        backgroundColor: '#ffffff'
      },
    },
      checked: {},
      track: {},
    })(Switch);

  return (
    <>
      <Typography variant="overline" className={classes.appBarCenterHeight}> Light Mode </Typography>
      <NavSwitch
        checked={theme === 'light' ? false: true}
        onClick={(e)=> {
          e.target.checked ? toggleTheme('dark') :toggleTheme('light')}}              
      />
      <Typography variant="overline" className={classes.appBarCenterHeight}> Dark Mode </Typography> 
    </> 
  );
}

LoggedInNav.propTypes = {
  username: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sheets: PropTypes.array.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,

  handleLogout: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
  handleHome: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  editPage: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

// LoggedOutNav.propTypes = {
//   theme: PropTypes.string.isRequired,
//   handleLogin: PropTypes.func.isRequired,
//   toggleTheme: PropTypes.func.isRequired,
// };

ThemeSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};