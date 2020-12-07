import { pageService } from "../services/PageService";
import { getLists } from "./List";
import { successAlert, errorAlert } from "./Alert";

//Actions
const SHEET_REQUEST = "components/common/SHEET_REQUEST";
const SHEET_INITIAL_SUCCESS = "components/common/SHEET_INITIAL_SUCCESS";
const SHEET_CHANGE_SUCCESS = "components/common/SHEET_CHANGE_SUCCESS";
const SHEET_SUCCESS = "components/common/SHEET_SUCCESS";
const SHEET_FAILURE = "components/common/SHEET_FAILURE";

const initialState = { sheets: [], loading: false };

//Reducer
export default function sheetReducer(state = initialState, action) {
  switch (action.type) {
    case SHEET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case SHEET_INITIAL_SUCCESS:
      return Object.assign({}, state, {
        activeSheet: action.sheets[0],
        sheets: action.sheets,
        loading: false,
      });
    case SHEET_CHANGE_SUCCESS:
      return Object.assign({}, state, {
        activeSheet: action.sheet,
        loading: false,
      });
    case SHEET_SUCCESS:
      return Object.assign({}, state, {
        activeSheet: state.activeSheet || action.sheets[0],
        sheets: action.sheets,
        loading: false,
      });
    case SHEET_FAILURE:
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
  return { type: SHEET_FAILURE, error };
}

export function getSheets(pageId) {
  return (dispatch) => {
    dispatch({ type: SHEET_REQUEST });
    pageService.getSheets(pageId).then(
      (sheets) => {
        dispatch({ type: SHEET_INITIAL_SUCCESS, sheets });
        // console.log(sheets);
        if (sheets && sheets.length > 0) {
          // console.log(sheets[0]._id);
          dispatch(getLists(sheets[0]._id));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}

export function changeSheet(body) {
  return (dispatch) => {
    dispatch({ type: SHEET_REQUEST });
    if (
      (body.activeSheet === undefined &&
        body.sheet._id !== body.sheets[0]._id) ||
      (body.activeSheet && body.sheet._id !== body.activeSheet._id)
    ) {
      dispatch({ type: SHEET_CHANGE_SUCCESS, sheet: body.sheet });
      dispatch(getLists(body.sheet._id));
    }
  };
}

function _getSheets(pageId) {
  return (dispatch) => {
    pageService.getSheets(pageId).then(
      (sheets) => {
        // console.log(sheets);
        dispatch({ type: SHEET_SUCCESS, sheets });
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
    dispatch({ type: SHEET_REQUEST });
    apiCall(body).then(
      (sheets) => {
        dispatch(successAlert("Successfully " + action + " sheet"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    ).then(()=>        
    {action === "added" ? dispatch(getSheets(body.pageId)) : dispatch(_getSheets(body.pageId))}
    )
  };
}

export function addSheet(body) {
  return _handleAction(pageService.createSheet, body, "added");
}
export function deleteSheet(body) {
  return _handleAction(pageService.deleteSheet, body, "deleted");
}
export function editSheet(body) {
  return _handleAction(pageService.update, body, "updated");
}
