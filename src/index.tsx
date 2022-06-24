import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import './index.css';
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"

const rootElement = document.getElementById("root")!;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
  </Router>
);