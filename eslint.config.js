import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";
import onehub from "./eslint-rules/index.js";

// Files that are "screens": built only from design-system components.
const SCREEN_FILES = [
  "src/screens/**/*.{ts,tsx}",
  "src/gallery/**/*.{ts,tsx}",
  "fixtures/ok/**/*.{ts,tsx}",
  "fixtures/violations/**/*.{ts,tsx}",
];

export default defineConfig(
  // Violation fixtures are linted only by `npm run test:guardrails`, which proves they fail.
  // comparison/ is a deliberate "before" example written the traditional way, so it breaks every rule on purpose.
  { ignores: ["dist", "node_modules", "fixtures/violations/**", "fixtures/type-errors/**", "comparison/**"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { onehub },
    rules: { "onehub/no-off-system-classes": "error" },
  },
  {
    files: SCREEN_FILES,
    rules: {
      "onehub/no-class-or-style-props": "error",
      "onehub/no-raw-elements": "error",
      "onehub/no-raw-values": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/components/**", "**/primitives/**", "**/tokens", "**/icons", "**/lib/**"],
              message: "Screens import only from '@onehub/ds'. Base components (BaseButton, BaseText...) are internal: use a role component.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["scripts/**", "eslint-rules/**", "eslint.config.js", "vite.config.ts"],
    languageOptions: { globals: globals.node },
  },
);
