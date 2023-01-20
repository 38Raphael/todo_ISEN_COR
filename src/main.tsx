import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start({
    onUnhandledRequest(req, print) {
      if (req.url.pathname.startsWith("/favicon")) {
        return;
      }

      print.warning();
    },
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
