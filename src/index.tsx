import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { routers } from "./routers/router";
import store from "./reducer/store";

import { Route, Routes } from "react-router-dom";

import {createRoot} from 'react-dom/client'
import "./index.css";

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {routers.map((v) => (
          <Route key={v.path} path={v.path} element={v.component} />
        ))}
      </Routes>
    </BrowserRouter>
  </Provider>
);
