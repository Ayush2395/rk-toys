import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./custom.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AppState from "./API/AppState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AppState>
        <App />
      </AppState>
    </Router>
  </React.StrictMode>
);
