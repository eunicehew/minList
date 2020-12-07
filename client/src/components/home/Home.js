import React, {useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Register from "./Register";
import Login from "./Login";
import HomeIcon from "./HomeIcon.jpg"

const Home = ({ loggedIn, user }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    img: {
      backgroundImage: `url(${HomeIcon})`,
      position: 'relative',
      height: '100vh',
      width: '100vw',
      opacity: '20%'
    },
    content: {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -30%)'
    },
    header:{
      letterSpacing: '5px'
    },
    hide: {
      display: "none",
    },
    loggedInContent: {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -30%)'
    }

  }));
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <div className={classes.root}>
      {loggedIn?     
        <div className={classes.loggedInContent}>    
          <Typography variant="h3" gutterBottom>Welcome back {user}</Typography>
          <HomeOutlinedIcon style={{ fontSize: "30vh" }} color="action"/>
        </div>
      : <>
        <div className={classes.img}/>
        <Container className={classes.content} maxWidth ="xs">
          <Typography className={classes.header} variant="h3" gutterBottom>minList</Typography>
          <AppBar position="static">
            <Tabs value={value} onChange={(e, newValue)=>setValue(newValue)} aria-label="tabs" centered>
              <Tab label="Login" id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
              <Tab label="Register" id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
            </Tabs>
          </AppBar>
          <div
            hidden={value !== 0}
            id={`simple-tabpanel-0`}
            aria-labelledby={`simple-tab-0`}>
            <Login/>
          </div>
          <div
            hidden={value !== 1}
            id={`simple-tabpanel-1`}
            aria-labelledby={`simple-tab-1`}>
            <Register />
          </div>
        </Container>
        </>
        }
    </div>
  );
};


Home.propTypes = {
  user: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.loginState.user.username,
    loggedIn: state.loginState.loggedIn,
  };
};

export default connect(mapStateToProps)(Home);
