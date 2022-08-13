import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { routers } from "./routers/router";
import store from "./reducer/store";

import { Route, Routes } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {routers.map((v) => (
          <Route key={v.path} path={v.path} element={v.component} />
        ))}
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
