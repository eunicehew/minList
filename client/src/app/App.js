import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Page from "../components/common/Page";
import { NavBar } from "../components/navBar";
import Alert from "../components/common/Alert";
import { clearAlert } from "../redux/Alert";


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user") ? (
          renderMergedProps(component, props, rest)
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const App = ({ ...props }) => {
  const theme = createMuiTheme({
    palette: {
      type: props.theme,
      primary: {main: props.theme === 'light' ? '#63b8f5' : '#bb4d00'},
      secondary: {main: props.theme === 'light' ? '#f5f5f5' : 'rgb(187 77 0 / 10%)'},
  
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
        <NavBar />
        {props.alertMessage && (
          <Alert
            type={props.alertType}
            message={props.alertMessage}
            clearAlert={props.clearAlert}
          />
        )}
        <Switch>
          <Route exact path="/" component={Page} />
          {props.pages
            ? props.pages.map((page) => {
                return (
                  <PrivateRoute
                    exact
                    key={page._id}
                    path={`/${page.name}`}
                    component={Page}
                    pageId={page._id}
                  />
                );
              })
            : null}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

App.propTypes = {
  alertMessage: PropTypes.string,
  alertType: PropTypes.string,
  clearAlert: PropTypes.func,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sheets: PropTypes.array.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  theme: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    pages: state.pageState.pages,
    alertType: state.alertState.type,
    alertMessage: state.alertState.message,
    theme: state.uiState.theme

  };
};
const mapDispatchToProps = {
  clearAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
