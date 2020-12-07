import { userService } from "../services/UserService";
import { LOGOUT } from "../app/store";
import { getPages } from "./Page";
import { errorAlert } from "./Alert";

//Actions
const LOGIN_REQUEST = "components/Home/LOGIN_REQUEST";
const LOGIN_SUCCESS = "components/Home/LOGIN_SUCCESS";
const LOGIN_FAILURE = "components/Home/LOGIN_FAILURE";

//Reducer
let user = localStorage.getItem("user");
const initialState = user
  ? { loggingIn: false, loggedIn: true, user: { username: user } }
  : { loggingIn: false, loggedIn: false, user: {} };

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        loggingIn: true,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggingIn: false,
        loggedIn: true,
        user: action.user,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggingIn: false,
        loggedIn: false,
        error: action.error,
      });
    default:
      return state;
  }
}

//Action Creators
export function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        dispatch(getPages());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: LOGIN_FAILURE, error };
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
}
