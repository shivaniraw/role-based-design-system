import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/theme.css";
import { OptionBox } from "@onehub/ds";

const SCREENS = ["Add New Word modal", "Active Translations", "Apply to Environments"];
const font = "'Google Sans', sans-serif";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div id="capture" style={{ display: "inline-flex", gap: 40, padding: 40, background: "#f6f6f6", fontFamily: font }}>
      {SCREENS.map((screen) => (
        <div key={screen} style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "#212121" }}>{screen}</span>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20 }}>
            <OptionBox label="Prod" defaultChecked />
          </div>
          <span style={{ fontSize: 13, color: "#1e8e3e" }}>{"<OptionBox label=\"Prod\" />"}</span>
        </div>
      ))}
    </div>
  </StrictMode>,
);
