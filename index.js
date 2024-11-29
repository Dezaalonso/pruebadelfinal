// index.js or main entry point
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ShoppingCartProvider } from "./ShoppingCartContext"; // Import the provider

ReactDOM.render(
  <ShoppingCartProvider>
    <App />
  </ShoppingCartProvider>,
  document.getElementById("root")
);
