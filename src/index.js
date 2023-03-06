import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store from "./Store";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";

let persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div> loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
