// src/index.js (or src/main.jsx)

import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM.createRoot for React 18+
import App from "./App";
// import "./styles.css"; 

// Create a root and render the App component into the root element
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
