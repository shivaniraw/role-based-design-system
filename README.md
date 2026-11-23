# OneHub Design System

A ready-made set of building blocks (buttons, fields, tables, pop-ups and more) for OneHub's admin screens. They are coded to match the Figma components in **TMS Design System**.

## Why this exists

Designers can ask an AI tool to build a screen. The code it writes is usually messy, so developers can't use it. This project fixes that:

- **Buttons are picked by what they do**, not by how they look. You ask for a "save" button or a "cancel" button, and the right colour and style come with it.
- **Spacing is picked by meaning**, not by numbers. You say two things are "related" or in different "groups", and the right gap is applied.
- **Shortcuts are blocked.** If the AI types a random colour or pixel size, a check fails and tells it what to use instead.

The result is screen code that is short, readable and ready for developers.

---

## Part 1: See it on your computer

You do this once. It takes about 10 minutes.

### Step 1. Install Node.js

Node.js is the free tool that runs this project.

1. Go to **https://nodejs.org**.
2. Download the version marked **LTS**.
3. Open the downloaded file and click **Next** until it finishes.

### Step 2. Download this project

1. On this project's GitHub page, click the green **Code** button.
2. Click **Download ZIP**.
3. Unzip the file somewhere easy to find, such as your Desktop.

### Step 3. Open a terminal in the project folder

- **Windows:** open the unzipped folder, click the address bar at the top, type `cmd` and press **Enter**.
- **Mac:** open the **Terminal** app, type `cd ` (with a space), drag the project folder into the window, and press **Enter**.

A black or white window with text appears. That is the terminal.

### Step 4. Install and start

Type this and press **Enter**. Wait until it finishes (a minute or two):

```
npm install
```

Then type this and press **Enter**:

```
npm run dev
```

You'll see a line like `Local: http://localhost:5173/`. Open that address in your browser.

### Step 5. Look around

The page has tabs across the top:

| Tab | What it shows |
|---|---|
| **Components** | Every building block in every state (normal, hover, error, disabled and so on) |
| **Screen: Pending Dev Keys** | The translation page with empty developer keys |
| **Screen: keys filled** | The same page with some keys typed in |
| **Screen: duplicate key error** | The red error after saving a key that already exists |
| **Screen: Active Translations** | Live translations, with the success message |
| **Screen: Apply to Environments** | Choosing Prod and Pre-Prod for each translation |
| **Screen: Add New Word** | The pop-up for adding a new word |

The screens work: you can type, tick boxes, switch tabs and open the pop-up.

To stop, go back to the terminal and press **Ctrl + C**.

---

## Part 2: Build a new screen with AI

1. Open your AI tool (for example Claude) inside this project folder.
2. Ask it to read **`LLM_RULES.md`** and **`manifest.json`** first. These tell it which building blocks exist and the rules for using them.
3. Give it your Figma screen or screenshot and ask it to build the screen in `src/screens/`.
4. When it's done, run this in the terminal:

   ```
   npm run check:screen
   ```

   - If it says **passed**, the code is clean and ready for a developer.
   - If it shows errors, paste them back to the AI and ask it to fix them. Repeat until it passes.

Use `src/screens/translation/` as the example to point the AI at. It shows the expected layout: one file per table or pop-up, sample data in `data.ts`, and one main file that puts them together.

---

## Part 3: Change a value (colour, spacing)

All values live in one file: **`src/styles/theme.css`**. Each one has a plain name, for example:

```
--color-action: #4285f4;
--spacing-group: 28px;
```

Change the number or colour, save, and every screen updates.

**Spacing:** the official spacing values are in **`spacing.tokens.json`**. If you change one there, change the same one in `theme.css`, then run:

```
npm run check:tokens
```

It tells you if the two files disagree.

---

## The checks

Run these in the terminal. Each one should end with a pass message.

| Command | What it checks |
|---|---|
| `npm run check:screen` | Screen code follows the rules |
| `npm run check:tokens` | Spacing in the code matches `spacing.tokens.json` |
| `npm run test:guardrails` | The rules still catch bad code |
| `npm run build` | The whole project builds without errors |

---

## What's in the folder

| File or folder | What it is |
|---|---|
| `src/components/` | The building blocks (buttons, fields, tables, pop-ups and so on) |
| `src/primitives/` | Layout helpers that place things in rows or columns with the right spacing |
| `src/screens/` | Finished screens built from the building blocks |
| `src/styles/theme.css` | Every colour, size and spacing value |
| `spacing.tokens.json` | The designer's official spacing values |
| `LLM_RULES.md` | Rules for the AI |
| `manifest.json` | List of every building block and when to use it |
| `TOKENS.md` | Values that are estimates and still need checking against Figma |

---

## Known gaps

- Some sizes and colours are estimates from screenshots. `TOKENS.md` lists them.
- The Pending Translations tab has no design yet, so it shows an empty message.
- Table thumbnails are placeholder drawings.

## For developers

React 19, TypeScript, Tailwind CSS v4 and Vite. Tailwind's default scales are removed in `theme.css`, so only the role tokens exist. Custom ESLint rules in `eslint-rules/` block `className`, `style`, raw HTML elements and raw values in screens. Screens import only from `@onehub/ds`. Desktop only, minimum width 1280px.
