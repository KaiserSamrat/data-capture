import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./store";
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

reportWebVitals();
