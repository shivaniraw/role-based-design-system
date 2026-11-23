// Proves the guardrails work: valid screens pass, deliberate violations fail.
// Usage: npm run test:guardrails
import { ESLint } from "eslint";
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

let failures = 0;
const pass = (label) => console.log(`PASS  ${label}`);
const fail = (label, detail = "") => {
  failures++;
  console.log(`FAIL  ${label}${detail ? `\n        ${detail}` : ""}`);
};

// 1. Theme: default scales removed, role tokens present.
{
  const run = spawnSync("node", ["scripts/spike-theme.mjs"], { encoding: "utf8" });
  if (run.status === 0) pass("theme: default scales removed, role tokens present");
  else fail("theme spike", run.stdout + run.stderr);
}

// 2. Lint: the ok fixture passes; every violation fixture fails with the expected rule.
const eslint = new ESLint({ ignore: false });

{
  const [result] = await eslint.lintFiles(["fixtures/ok/ok-screen.tsx"]);
  if (result && result.errorCount === 0) pass("lint: fixtures/ok/ok-screen.tsx has no errors");
  else fail("lint: ok screen should pass", result?.messages.map((m) => `${m.ruleId}: ${m.message}`).join("\n        "));
}

const dir = "fixtures/violations";
for (const file of readdirSync(dir).filter((f) => f.endsWith(".tsx")).sort()) {
  const source = readFileSync(path.join(dir, file), "utf8");
  const expected = /EXPECT:\s*(\S+)/.exec(source)?.[1];
  const [result] = await eslint.lintFiles([path.join(dir, file)]);
  const ids = new Set(result?.messages.map((m) => m.ruleId));
  if (expected && ids.has(expected)) {
    pass(`lint: ${file} is rejected by ${expected} (${result.errorCount} error${result.errorCount === 1 ? "" : "s"})`);
  } else {
    fail(`lint: ${file} should be rejected by ${expected}`, `got: ${[...ids].join(", ") || "no errors"}`);
  }
}

// 3. Types: ok fixture compiles; invalid roles and props do not.
{
  const ok = spawnSync("npx", ["tsc", "-p", "tsconfig.fixtures-ok.json", "--noEmit"], { encoding: "utf8" });
  if (ok.status === 0) pass("types: fixtures/ok compiles");
  else fail("types: ok fixture should compile", ok.stdout);

  const bad = spawnSync("npx", ["tsc", "-p", "tsconfig.fixtures-bad.json", "--noEmit"], { encoding: "utf8" });
  const count = (bad.stdout.match(/error TS/g) ?? []).length;
  if (bad.status !== 0 && count >= 4) pass(`types: invalid roles/props fail to compile (${count} errors)`);
  else fail("types: invalid-roles fixture should produce at least 4 errors", `got ${count}`);
}

// 4. Manifest lists every exported component.
{
  const index = readFileSync("src/index.ts", "utf8");
  const exported = new Set();
  for (const m of index.matchAll(/export\s+\{([^}]+)\}\s+from/g)) {
    for (const name of m[1].split(",").map((s) => s.trim())) {
      if (/^[A-Z][a-z]/.test(name)) exported.add(name); // components, not CONSTANTS
    }
  }
  const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
  const listed = new Set(manifest.components.map((c) => c.name));
  const missing = [...exported].filter((n) => !listed.has(n));
  const extra = [...listed].filter((n) => !exported.has(n));
  if (missing.length === 0 && extra.length === 0) pass(`manifest: lists all ${exported.size} exported components`);
  else fail("manifest out of sync with src/index.ts", `missing: ${missing.join(", ") || "-"}; unknown: ${extra.join(", ") || "-"}`);
}

console.log(failures ? `\n${failures} guardrail check(s) failed` : "\nAll guardrail checks passed");
process.exit(failures ? 1 : 0);
