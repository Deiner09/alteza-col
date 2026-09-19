import React from "react";
import ReactDOM from "react-dom/client";

import Component from "@/components/ui/lumina-interactive-list";

import "./scss/main.scss";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
);