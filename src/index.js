import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@blueprintjs/core/lib/css/blueprint.css";

window.UrlEditor = (containerSelector, params) => {
  console.log(containerSelector);
  console.log(document.querySelector(containerSelector));
  ReactDOM.render(
    <React.StrictMode>
      <App params={params} />
    </React.StrictMode>,
    document.querySelector(containerSelector)
  );
};

window.UrlEditor("#root", ["foo", "bar"]);
