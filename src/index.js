import "./index.css";

import React from "react";
import reactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import { reducers } from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
