import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./traditional.css";
import { OptionCardEnvironments, OptionCardModal, OptionCardTable } from "./OptionCard.traditional";

const SPECS = [
  { screen: "Add New Word modal", spec: "40px tall · 8px corners · 1px border · 18px box", Card: OptionCardModal },
  { screen: "Active Translations", spec: "36px tall · 6px corners · tinted fill · 16px box", Card: OptionCardTable },
  { screen: "Apply to Environments", spec: "44px tall · 10px corners · 2px border · 20px box", Card: OptionCardEnvironments },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div id="capture" className="inline-flex gap-10 bg-[#f6f6f6] p-10" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      {SPECS.map(({ screen, spec, Card }) => (
        <div key={screen} className="flex w-[300px] flex-col gap-3">
          <span className="text-[15px] font-medium text-[#212121]">{screen}</span>
          <div className="rounded-xl bg-white p-5">
            <Card label="Prod" />
          </div>
          <span className="text-[13px] text-[#d93025]">{spec}</span>
        </div>
      ))}
    </div>
  </StrictMode>,
);
