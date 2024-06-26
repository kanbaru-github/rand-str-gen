import React from "react";
import ReactDOM from "react-dom/client";
import "../scss/main.scss";
import RandomTextGenerator from "./components/RandomTextGenerator";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RandomTextGenerator />
  </React.StrictMode>
);
