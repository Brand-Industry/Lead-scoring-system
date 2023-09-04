import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//SCSS
// import "./styles/base.scss";
// import "./styles/bootstrap.scss";

const ElementRoot = document.querySelector("#leadSystem");
if (ElementRoot) {
  const root = ReactDOM.createRoot(ElementRoot);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
