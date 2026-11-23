// Fails if src/styles/theme.css drifts from spacing.tokens.json (the designer's source of truth).
import { readFileSync } from "node:fs";
const tokens = JSON.parse(readFileSync("spacing.tokens.json", "utf8"));
const css = readFileSync("src/styles/theme.css", "utf8");
const cssName = (group, key) =>
  group === "spacing" ? key
  : group === "inset" ? `inset-${key}`
  : `${group}-${key.replace(/^inset-/, "")}`;
let bad = 0, n = 0;
for (const [group, entries] of Object.entries(tokens)) {
  for (const [key, t] of Object.entries(entries)) {
    n++;
    const name = cssName(group, key);
    const m = css.match(new RegExp(`--spacing-${name}:\\s*(\\d+)px`));
    const want = t.$value.value;
    if (!m || Number(m[1]) !== want) {
      bad++;
      console.error(`DRIFT  --spacing-${name}: css=${m ? m[1] : "missing"} tokens=${want}`);
    }
  }
}
if (bad) process.exit(1);
console.log(`OK  ${n} spacing tokens match theme.css`);
