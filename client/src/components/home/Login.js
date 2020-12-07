import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HttpsIcon from "@material-ui/icons/Https";
import { login } from "../../redux/Login";
import { infoAlert } from "../../redux/Alert";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.value.length < 3) {
      this.setState({ [e.target.id + "Error"]: true });
    }
    if (e.target.value.length >= 3 && e.target.id + "Error") {
      this.setState({ [e.target.id + "Error"]: false });
    }
  };

  handleLogin = (e) => {
    e.preventDefault();
    if (
      this.state.username &&
      this.state.password &&
      !this.state.usernameError &&
      !this.state.passwordError
    ) {
      this.props.login(
        this.state.username,
        this.state.password,
        this.props.history
      );
    } else {
      this.props.infoAlert("Please enter valid username and password.");
    }
  };
  handleAdminLogin = (e) => {
    e.preventDefault();
    this.props.login("tester", "pass", this.props.history);
  };

  render() {
    return (
      <Card >
        <form
          className="form"
          noValidate
          autoComplete="off"
          onSubmit={this.handleLogin}
        >
          <CardContent style={{ margin: "5px" }}>
            <TextField
              style={{ padding: "15px" }}
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
              onChange={this.handleChange}
              error={this.state.usernameError}
              helperText={
                this.state.usernameError
                  ? "Username must be 3+ characters"
                  : null
              }
            />
            <TextField
              style={{ padding: "15px" }}            
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                )
              }}
              onChange={this.handleChange}
              error={this.state.passwordError}
              helperText={
                this.state.passwordError
                  ? "Password must be 3+ characters"
                  : null
              }
            />
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
            <Button variant="contained" fullWidth onClick={this.handleAdminLogin}>
              Admin Login
            </Button>
          </CardContent>
        </form>
      </Card>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  infoAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  login,
  infoAlert,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
