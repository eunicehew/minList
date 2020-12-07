import { userService } from "../services/UserService";
import { login } from "./Login";
import { successAlert, errorAlert } from "./Alert";

//Actions
const REGISTER_REQUEST = "components/Home/REGISTER_REQUEST";
const REGISTER_SUCCESS = "components/Home/REGISTER_SUCCESS";
const REGISTER_FAILURE = "components/Home/REGISTER_FAILURE";

//Reducer
export default function registerReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        registering: true,
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        registering: false,
        registered: true,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        registering: false,
        registered: false,
        error: action.error,
      });
    default:
      return state;
  }
}

//Action Creators
export function register(username, password) {
  return (dispatch) => {
    dispatch(request());
    userService.register(username, password).then(
      () => {
        dispatch(success());
        dispatch(login(username, password));
        dispatch(successAlert("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };

  function request() {
    return { type: REGISTER_REQUEST };
  }
  function success() {
    return { type: REGISTER_SUCCESS };
  }
  function failure(error) {
    return { type: REGISTER_FAILURE, error };
  }
}
