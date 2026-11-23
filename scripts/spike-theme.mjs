// Phase 2 spike: proves the theme removes default scales and exposes role tokens.
// Usage: node scripts/spike-theme.mjs
import { compile } from "@tailwindcss/node";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = path.join(root, "src/styles/theme.css");
const css = readFileSync(cssPath, "utf8");

const compiler = await compile(css, { base: path.dirname(cssPath), onDependency: () => {} });

const mustExist = [
  "gap-related", "gap-group", "gap-region", "p-inset-panel", "px-inset-field-x",
  "h-control-h", "bg-action", "text-on-action", "rounded-control", "text-body",
  "shadow-card", "font-medium", "inset-zero", "min-w-zero", "animate-spin", "w-col-md",
  "size-icon", "top-region",
];
const mustNotExist = [
  "p-4", "m-2", "gap-6", "px-3", "w-72", "h-10", "bg-blue-500", "text-gray-700",
  "bg-white", "text-black", "text-lg", "rounded-lg", "shadow-md", "md:p-4",
  "p-0", "inset-0", "gap-0", "min-w-0",
];

let failures = 0;
for (const c of mustExist) {
  const out = compiler.build([c]);
  const ok = out.includes(`.${c.replace(/[:]/g, "\\:")}`);
  console.log(`${ok ? "PASS" : "FAIL"}  exists     ${c}`);
  if (!ok) failures++;
}
for (const c of mustNotExist) {
  const out = compiler.build([c]);
  const generated = out.includes(`.${c.replace(/[:]/g, "\\:")}`);
  console.log(`${!generated ? "PASS" : "FAIL"}  not-exists ${c}`);
  if (generated) failures++;
}
// Arbitrary values are NOT blocked by the theme; ESLint must catch them.
const arb = compiler.build(["mt-[13px]"]).includes(".mt-\\[13px\\]");
console.log(`INFO  arbitrary value mt-[13px] generates CSS: ${arb} (blocked by ESLint, not by the theme)`);

if (failures) {
  console.error(`\n${failures} theme check(s) failed`);
  process.exit(1);
}
console.log("\nTheme spike passed");
