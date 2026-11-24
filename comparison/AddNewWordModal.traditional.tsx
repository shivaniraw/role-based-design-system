// BEFORE: the Add New Word modal as an AI writes it with a traditional, value-based setup
// (plain Tailwind, no roles). It looks right on screen. Every value in it is a guess.
// This file is a teaching example for the portfolio. Do not copy it into src/.
import { useState } from "react";

export function AddNewWordModalTraditional({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState("Knowledge Center");
  const [module, setModule] = useState("");
  const [source, setSource] = useState("");
  const [local, setLocal] = useState("");
  const [prod, setProd] = useState(true);
  const [preProd, setPreProd] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="w-[760px] rounded-[20px] bg-white p-10 shadow-xl"
        style={{ fontFamily: "'Google Sans', sans-serif" }}
      >
        <div className="mb-11 flex items-center justify-between">
          <h2 className="text-[20px] font-medium text-[#212121]">Add New Word</h2>
          <button onClick={onClose} className="h-6 w-6 text-[#757575] hover:text-[#424242]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-7">
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="mb-3 block text-sm text-[#424242]">
                Select Page <span className="text-[#d93025]">*</span>
              </label>
              <select
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#dadce0] px-3 text-sm text-[#212121]"
              >
                <option>Knowledge Center</option>
                <option>Home</option>
                <option>Storehub</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-3 block text-sm text-[#424242]">Select Module</label>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#dadce0] px-3 text-sm text-[#757575]"
              >
                <option value="">Select Module</option>
                <option>Pixel 11 Pro Fold</option>
                <option>Metrics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[14px] text-[#424242]">
              English Source Text <span className="text-[#d93025]">*</span>
            </label>
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source text"
              className="h-[42px] w-full rounded-[8px] border border-[#DADCE0] px-3 text-sm placeholder:text-[#9e9e9e]"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm text-[#424242]">
              Local Language Translation (French) <span className="text-red-600">*</span>
            </label>
            <textarea
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Enter translation"
              className="h-[68px] w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm text-[#424242]">UI Screenshot</label>
            <div className="flex h-[140px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#dadce0] bg-[#fafafa]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#4285F4]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
              </svg>
              <span className="text-[13px] text-[#757575]">Click to upload or drag and drop</span>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-[#424242]">Save on Environment</p>
            <div className="flex gap-5">
              <label className="flex h-10 flex-1 items-center gap-3 rounded-lg border border-[#4285f4] px-1.5">
                <input type="checkbox" checked={prod} onChange={(e) => setProd(e.target.checked)} className="h-[18px] w-[18px] accent-[#4285F4]" />
                <span className="text-sm">Prod</span>
              </label>
              <label className="flex h-10 flex-1 items-center gap-2.5 rounded-lg border border-[#4285F4] px-2">
                <input type="checkbox" checked={preProd} onChange={(e) => setPreProd(e.target.checked)} className="h-4 w-4 accent-blue-500" />
                <span className="text-sm">Pre-Prod</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-11 flex justify-between pt-2">
          <button
            onClick={onClose}
            className="h-11 rounded-[10px] border border-[#4285f4] px-5 font-medium text-[#4285f4] hover:bg-blue-50"
          >
            Cancel
          </button>
          <button
            disabled={!source || !local}
            className="h-11 rounded-[10px] bg-[#4285F4] px-5 font-medium text-white hover:bg-[#3b78e7] disabled:opacity-50"
            style={{ minWidth: 220 }}
          >
            Save as Pending_Dev_key
          </button>
        </div>
      </div>
    </div>
  );
}
