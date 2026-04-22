import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import { reducers } from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
);
