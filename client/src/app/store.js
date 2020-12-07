import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import alertReducer from "../redux/Alert";
import loginReducer from "../redux/Login";
import registerReducer from "../redux/Register";
import pageReducer from "../redux/Page";
import sheetReducer from "../redux/Sheet";
import listReducer from "../redux/List";
import itemReducer from "../redux/Item";
import uiReducer from "../redux/UI";

const persistConfig = {
  key: 'root',
  storage,
}
 
const reducers = combineReducers({
  alertState: alertReducer,
  loginState: loginReducer,
  registerState: registerReducer,
  pageState: pageReducer,
  sheetState: sheetReducer,
  listState: listReducer,
  itemState: itemReducer,
  uiState: uiReducer,
});

export const LOGOUT = "components/LOGOUT";
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    localStorage.clear()
    state = {
      "uiState": {theme: 'light', menuOpen: false},
      "loginState": {loggingIn: false, loggedIn: false, user: {}}
    };
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)
export { store, persistor }
