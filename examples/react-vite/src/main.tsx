import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ObservabilityView } from "./ObservabilityView.js";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ObservabilityView />
    </StrictMode>
  );
}
