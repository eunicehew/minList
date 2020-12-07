import { itemService } from "../services/ItemService";
import { successAlert, errorAlert } from "./Alert";

//Actions
const ITEM_REQUEST = "components/common/ITEM_REQUEST";
const ITEM_SUCCESS = "components/common/ITEM_SUCCESS";
const ITEM_MOVE_SUCCESS = "components/common/ITEM_MOVE_SUCCESS";
const ITEM_FAILURE = "components/common/ITEM_FAILURE";

const initialState = { items: [], loading: false, listIdLoading: [] };

//Reducer
export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        listIdLoading: [...state.listIdLoading, action.listId],
      });
    case ITEM_SUCCESS:
      return Object.assign({}, state, {
        items: (state.items.find((item) => item._id === action.items._id) &&
          state.items.map((item) =>
            action.items._id === item._id ? action.items : item
          )) || [...state.items, action.items],
        loading: false,
        listIdLoading: [],
      });
    case ITEM_MOVE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        listIdLoading: [],
      });
    case ITEM_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        listIdLoading: [],
      });
    default:
      return state;
  }
}

//Action Creators
function failure(error) {
  return { type: ITEM_FAILURE, error };
}

export function getItems(listId) {
  return (dispatch) => {
    dispatch({ type: ITEM_REQUEST, listId });
    itemService.getItems(listId).then(
      (items) => {
        // console.log(items);
        dispatch({ type: ITEM_SUCCESS, items });
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}


export function moveItem(body) {
  return (dispatch) => {
    dispatch({ type: ITEM_REQUEST, listId: body.listId });
    itemService.getParentList(body.itemId).then(
      (parentList) => {
        body.parentListId = parentList._id;
        
        body.index = 
        body.bottomItem !== 0 && body.items.findIndex((i) => i._id === body.bottomItem) !== -1
          ? body.items.findIndex((i) => i._id === body.bottomItem)
          : body.bottomItem !== 0 ? body.bottomItem : 0;
          
        itemService.moveItem(body).then(
          () => {
            dispatch({ type: ITEM_MOVE_SUCCESS });
            dispatch(getItems(body.listId));
            dispatch(getItems(body.parentListId));
            dispatch(successAlert("Successfully moved item"));
          },
          (error) => {
            dispatch(failure(error.toString()));
            dispatch(errorAlert(error.toString()));
          }
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}


function _handleAction(apiCall, body, action) {
  console.log(body)
  return (dispatch) => {
    dispatch({ type: ITEM_REQUEST });
    apiCall(body).then(
      (items) => {
        // console.log(items);
        dispatch(successAlert("Successfully " + action + " item"));
        dispatch(getItems(body.listId));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(errorAlert(error.toString()));
      }
    );
  };
}

export function addItem(body) {
  return _handleAction(itemService.create, body, "added");
}
export function deleteItem(body) {
  return _handleAction(itemService.deleteItem, body, "deleted");
}
export function editItem(body) {
  return _handleAction(itemService.update, body, "updated");
}
