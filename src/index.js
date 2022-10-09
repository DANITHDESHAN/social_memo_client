import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
