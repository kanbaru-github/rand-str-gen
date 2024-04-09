import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "../scss/index.scss";
import RandomTextGenerator from "./components/RandomTextGenerator";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RandomTextGenerator />
  </React.StrictMode>
);
