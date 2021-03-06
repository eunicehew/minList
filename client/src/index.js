import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.css";
import App from "./app/App";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
