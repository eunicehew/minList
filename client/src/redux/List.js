import { pageService } from "../services/PageService";
import { getItems } from "./Item";
import { successAlert, errorAlert } from "./Alert";

//Actions
const LIST_REQUEST = "components/common/LIST_REQUEST";
const LIST_SUCCESS = "components/common/LIST_SUCCESS";
const LIST_FAILURE = "components/common/LIST_FAILURE";

const initialState = { lists: [], loading: false };

//Reducer
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        lists: []
      });
    case LIST_SUCCESS:
      return Object.assign({}, state, {
        lists: action.lists,
        loading: false,
      });
    case LIST_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
}

//Action Creators
function failure(error) {
  return { type: LIST_FAILURE, error };
}

export function getLists(sheetId) {
  return (dispatch) => {
    dispatch({ type: LIST_REQUEST });
    pageService.getSheets(sheetId).then(
      (lists) => {
        dispatch({ type: LIST_SUCCESS, lists });
        if (lists && lists.length > 0) {
          lists.map((list) => {
            return dispatch(getItems(list._id));
          });
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}

function _getLists(sheetId) {
  return (dispatch) => {
    dispatch({ type: LIST_REQUEST });
    pageService.getSheets(sheetId).then(
      (lists) => {
        dispatch({ type: LIST_SUCCESS, lists });
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}

function _handleAction(apiCall, body, action) {
  return (dispatch) => {
    dispatch({ type: LIST_REQUEST });
    apiCall(body).then(
      (lists) => {
        dispatch(successAlert("Successfully " + action + " list"));
        dispatch(_getLists(body.pageId));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}

//sheet functions double for lists
export function addList(body) {
  return _handleAction(pageService.createSheet, body, "added");
}
export function deleteList(body) {
  return _handleAction(pageService.deleteList, body, "deleted");
}
export function editList(body) {
  return _handleAction(pageService.update, body, "updated");
}
