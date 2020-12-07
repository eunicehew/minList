import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(20),
    ...theme.mixins.toolbar,
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

const Alert = ({ type, message, clearAlert }) => {
  const classes = useStyles();
  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={true}
      autoHideDuration={6000}
      onClose={() => clearAlert()}
    >
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  clearAlert: PropTypes.func.isRequired,
};

export default Alert;
