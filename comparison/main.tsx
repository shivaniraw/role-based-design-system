import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./traditional.css";
import { AddNewWordModalTraditional } from "./AddNewWordModal.traditional";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AddNewWordModalTraditional onClose={() => undefined} />
  </StrictMode>,
);
