// BEFORE: the Prod / Pre-Prod option card as it came out on three screens when each was
// vibe-coded separately. Each one looks fine alone. Side by side, they are three components.
// Teaching example for the portfolio. Do not copy it into src/.

/** Add New Word modal */
export function OptionCardModal({ label }: { label: string }) {
  return (
    <label className="flex h-10 w-full items-center gap-3 rounded-lg border border-[#4285f4] px-1.5">
      <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-[#4285F4]" />
      <span className="text-sm text-[#212121]">{label}</span>
    </label>
  );
}

/** Active Translations table */
export function OptionCardTable({ label }: { label: string }) {
  return (
    <div className="flex h-9 w-full items-center gap-2 rounded-md border border-blue-500 bg-blue-50 px-3">
      <input type="checkbox" defaultChecked className="h-4 w-4" />
      <span className="text-[13px] text-gray-800">{label}</span>
    </div>
  );
}

/** Apply to Environments */
export function OptionCardEnvironments({ label }: { label: string }) {
  return (
    <label
      className="flex w-full items-center gap-2.5 rounded-[10px] border-2 border-[#4285F4] px-2.5"
      style={{ height: 44 }}
    >
      <input type="checkbox" defaultChecked className="h-5 w-5 accent-blue-600" />
      <span className="text-[15px] font-medium text-[#424242]">{label}</span>
    </label>
  );
}
