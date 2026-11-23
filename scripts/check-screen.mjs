// The gate for a generated screen. Prints errors in a form an LLM can act on.
// Usage: npm run check:screen            (all of src/screens)
//        npm run check:screen -- src/screens/MyScreen.tsx
import { ESLint } from "eslint";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

const targets = process.argv.slice(2);
const files = targets.length ? targets : ["src/screens"];
let failed = false;

// 1. Lint: no raw values, no className/style, no raw elements, no off-system classes.
const eslint = new ESLint();
const results = await eslint.lintFiles(files);
const problems = results.flatMap((r) =>
  r.messages
    .filter((m) => m.severity === 2)
    .map((m) => `${path.relative(root, r.filePath)}:${m.line}:${m.column}  ${m.message}  [${m.ruleId}]`),
);
if (problems.length) {
  failed = true;
  console.log(`LINT: ${problems.length} problem(s)\n  ${problems.join("\n  ")}\n`);
} else {
  console.log("LINT: ok");
}

// 2. Types: invalid roles and props do not compile.
const tsc = spawnSync("npx", ["tsc", "--noEmit", "--pretty", "false"], { encoding: "utf8" });
if (tsc.status !== 0) {
  failed = true;
  console.log(`TYPES: errors\n  ${tsc.stdout.trim().split("\n").join("\n  ")}\n`);
} else {
  console.log("TYPES: ok");
}

if (failed) {
  console.log(
    "\ncheck:screen FAILED. Fix every item above using design-system components and role props.\n" +
      "If an action or layout has no matching role, do NOT invent a value: report `needs-new-role` or `needs-new-component`.",
  );
  process.exit(1);
}
console.log("\ncheck:screen passed");
