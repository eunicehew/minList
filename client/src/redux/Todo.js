import { todoService } from "../services/TodoService";

//Actions
const GET_TODOS_REQUEST = "components/Todo/GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "components/Todo/GET_TODOS_SUCCESS";
const FAILURE = "components/Todo/GET_TODOS_FAILURE";
const TODO_REQUEST = "components/Todo/TODO_REQUEST";
const TODO_SUCCESS = "components/Todo/TODO_SUCCESS";

//Reducer
export default function todoReducer(state = [], action) {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return Object.assign({}, state, {
        gettingTodos: true,
      });
    case GET_TODOS_SUCCESS:
      return Object.assign({}, state, {
        todos: action.todos,
      });
    // return action.todos;
    case TODO_REQUEST:
      return Object.assign({}, state, {
        todoAction: true,
      });
    case TODO_SUCCESS:
      return Object.assign({}, state, {
        todoSuccess: true,
      });
    case FAILURE:
      return Object.assign({}, state, {
        error: true,
      });
    default:
      return state;
  }
}

//Action Creators
export function getTodos() {
  return (dispatch) => {
    console.log("gettodos");
    dispatch({ type: GET_TODOS_REQUEST });
    todoService.getTodos().then(
      (todos) => {
        console.log(todos);
        dispatch({ type: GET_TODOS_SUCCESS, todos });
      },
      (error) => {
        dispatch({ type: FAILURE, payload: error.toString() });
      }
    );
  };
}

function _handleTodo(apiCall, body) {
  return (dispatch) => {
    dispatch({ type: TODO_REQUEST });
    apiCall(body).then(
      (todos) => {
        dispatch({ type: TODO_SUCCESS, todos });
        dispatch(getTodos());
      },
      (error) => {
        dispatch({ type: FAILURE, payload: error.toString() });
      }
    );
  };
}

export function addTodo(todo) {
  return _handleTodo(todoService.addTodo, todo);
}
export function deleteTodo(id) {
  return _handleTodo(todoService.deleteTodo, id);
}
export function updateTodo(todo) {
  return _handleTodo(todoService.updateTodo, todo);
}

//Side effects as applicable
