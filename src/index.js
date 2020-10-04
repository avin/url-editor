import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.UrlEditor = (containerSelector, params) => {
  ReactDOM.render(
    <React.StrictMode>
      <App params={params} />
    </React.StrictMode>,
    document.querySelector(containerSelector)
  );
};

window.UrlEditor("#root", ["foo", "bar"]);
