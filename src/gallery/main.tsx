import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/theme.css";
import { Gallery } from "./Gallery";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root");

createRoot(root).render(
  <StrictMode>
    <Gallery />
  </StrictMode>,
);
