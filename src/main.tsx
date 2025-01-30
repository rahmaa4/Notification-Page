import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.scss";

const rootElement = document.getElementById("root")!;
const rootObject = createRoot(rootElement);
rootObject.render(
  <StrictMode>
      <App/>
  </StrictMode>
)
