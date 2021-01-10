import { pageService } from "../services/PageService";
import { successAlert, errorAlert } from "./Alert";

//Actions
const PAGE_REQUEST = "components/common/PAGE_REQUEST";
const PAGE_SUCCESS = "components/common/PAGE_SUCCESS";
const PAGE_FAILURE = "components/common/PAGE_FAILURE";

const initialState = { pages: [], loading: false };

//Reducer
export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case PAGE_SUCCESS:
      return Object.assign({}, state, {
        pages: action.pages,
        loading: false,
      });
    case PAGE_FAILURE:
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
  return { type: PAGE_FAILURE, error };
}

export function getPages() {
  return (dispatch) => {
    dispatch({ type: PAGE_REQUEST });
    pageService.getPages().then(
      (pages) => {
        dispatch({ type: PAGE_SUCCESS, pages });
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}

function _handlePageAction(apiCall, body, action) {
  return (dispatch) => {
    apiCall(body).then(
      () => {
        dispatch(successAlert("Successfully " + action + " page"));
        dispatch(getPages());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}

//check what is being taken as body/necessary params
export function addPage(body) {
  return _handlePageAction(pageService.createPage, body, "added");
}
export function deletePage(body) {
  return _handlePageAction(pageService.deletePage, body, "deleted");
}
export function editPage(body) {
  return _handlePageAction(pageService.update, body, "updated");
}
