import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from "@material-ui/icons/AccountCircle";
import HttpsIcon from "@material-ui/icons/Https";
import { register } from "../../redux/Register";
import { infoAlert } from "../../redux/Alert";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      regUsername: "",
      regPassword: "",
      regPasswordTwo: "",
      regUsernameError: false,
      regPasswordError: false,
      regPasswordTwoError: false,
      passwordsEqualError: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.value.length < 3) {
      this.setState({ [e.target.id + "Error"]: true }, 
      );
    }
    else if (
      !this.state.passwordsEqualError && 
      ((e.target.id === "regPassword" &&
        e.target.value !== this.state.regPasswordTwo) ||
        (e.target.id === "regPasswordTwo" &&
          e.target.value !== this.state.regPassword))
    ) {
      this.setState({ passwordsEqualError: true });
    }
    if (e.target.value.length >= 3 && e.target.id + "Error") {
      this.setState({ [e.target.id + "Error"]: false });
    }
    if (
      this.state.passwordsEqualError &&
      ((e.target.id === "regPassword" &&
        e.target.value === this.state.regPasswordTwo) ||
        (e.target.id === "regPasswordTwo" &&
          e.target.value === this.state.regPassword))
    ) {
      this.setState({ passwordsEqualError: false });
    }
  };

  handleRegister = (e) => {
    e.preventDefault();
    if (
      this.state.regUsername &&
      this.state.regPassword &&
      !this.state.regUsernameError &&
      !this.state.regPasswordError &&
      !this.state.regPasswordTwoError &&
      !this.state.passwordsEqualError
    ) {
      this.props.register(this.state.regUsername, this.state.regPassword);
    } else {
      this.props.infoAlert(
        "Please enter valid username and password combination."
      );
    }
  };
  render() {
    return (
      <Card >
        <form
          className="form"
          noValidate
          autoComplete="off"
          onSubmit={this.handleRegister}
        >
          <CardContent style={{ margin: "5px" }}>
            <TextField
              style={{ padding: "15px" }}
              id="regUsername"
              label="Username"
              autoComplete="regUsername"
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
              error={this.state.regUsernameError}
              helperText={
                this.state.regUsernameError
                  ? "Username must be 3+ characters"
                  : null
              }
            />
            <TextField
              style={{ padding: "15px" }}
              id="regPassword"
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
              error={
                this.state.regPasswordError ||
                this.state.passwordsEqualError
              }
              helperText={
                this.state.regPasswordError
                  ? "Password must be 3+ characters"
                  : this.state.passwordsEqualError
                  ? "Passwords do not match"
                  : null
              }
            />
            <TextField
              style={{ padding: "15px" }}
              id="regPasswordTwo"
              label="Re-enter Password"
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
              error={
                this.state.regPasswordTwoError ||
                this.state.passwordsEqualError
              }
              helperText={
                this.state.regPasswordTwoError
                  ? "Password must be 3+ characters"
                  : this.state.passwordsEqualError
                  ? "Passwords do not match"
                  : null
              }
            />
          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
          </CardContent>
        </form>
      </Card>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  infoAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  register,
  infoAlert,
};

export default connect(null, mapDispatchToProps)(Register);
