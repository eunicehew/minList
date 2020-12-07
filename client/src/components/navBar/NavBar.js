import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoggedInNav } from "./NavViews";
import { login, logout } from "../../redux/Login";
import { addPage, editPage, deletePage } from "../../redux/Page";
import { toggleMenu, toggleTheme } from "../../redux/UI";

class NavBar extends React.Component {

  // handleLogin = (e) => {
  //   e.preventDefault();
  //   this.props.login("tester", "pass", this.props.history);
  // };

  handleRedirect = (page) => {
    this.props.history.push(`/${page.name}`);
  };
  handleHome = () => {
    this.props.history.push(`/`);
  };

  render() {
    return (
      <>
        {this.props.loggedIn ? (
          <LoggedInNav
            pages={this.props.pages}
            handleLogout={this.props.logout}
            handleRedirect={this.handleRedirect}
            handleHome={this.handleHome}
            addPage={this.props.addPage}
            editPage={this.props.editPage}
            deletePage={this.props.deletePage}
            username={this.props.user.username}
            toggleMenu={this.props.toggleMenu}
            toggleTheme={this.props.toggleTheme}
            theme={this.props.theme}
            open={this.props.menuOpen}
            pathname={this.props.location.pathname}
          />
        ) : ( null
          // <LoggedOutNav
          //   handleLogin={this.handleLogin}
          //   handleRedirect={this.handleRedirect}
          //   toggleTheme={this.props.toggleTheme}
          //   theme={this.props.theme}
          // />
        )}
      </>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sheets: PropTypes.array.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  theme: PropTypes.string.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.node,
  }).isRequired,

  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
  deletePage: PropTypes.func.isRequired,
  editPage: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state.uiState);
  return {
    pages: state.pageState.pages,
    loggingIn: state.loginState.loggingIn,
    loggedIn: state.loginState.loggedIn,
    user: state.loginState.user,
    menuOpen: state.uiState.menuOpen,
    theme: state.uiState.theme
  };
};

const mapDispatchToProps = {
  login,
  logout,
  addPage,
  editPage,
  deletePage,
  toggleTheme,
  toggleMenu,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
