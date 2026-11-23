// Types, sample data and small helpers for the Translation Management screen.
import type { NavEntry, SelectOption, TabItem } from "@onehub/ds";

export type TabValue = "active" | "pending" | "keys";

/** A key waiting for a developer key to be assigned. */
export interface PendingKey {
  id: string;
  page: string;
  module: string;
  source: string;
  local: string;
  devKey: string;
}

/** A key that is already live (or ready to go live) in one or both environments. */
export interface ActiveRow {
  id: string;
  devKey: string;
  /** Recently changed keys are flagged in the table. */
  flag?: "new" | "updated";
  source: string;
  local: string;
  preProd: boolean;
  prod: boolean;
  /** Environments where the translation is already live. Those boxes cannot be changed. */
  lockedPreProd: boolean;
  lockedProd: boolean;
}

export const NAV_ITEMS: NavEntry[] = [
  { id: "prod", label: "OneHub", icon: "home" },
  { id: "preprod", label: "OneHub - PreProd", icon: "home" },
  { id: "testing", label: "OneHub - Testing", icon: "home" },
  { id: "notifications", label: "Notification Dashboard", icon: "bell" },
];

export const LANGUAGES: SelectOption[] = [
  { value: "FR", label: "FR" },
  { value: "EN", label: "EN" },
];

export const PAGES: SelectOption[] = [
  { value: "Knowledge Center", label: "Knowledge Center" },
  { value: "Home", label: "Home" },
  { value: "Storehub", label: "Storehub" },
];

export const MODULES: SelectOption[] = [
  { value: "Pixel 11 Pro Fold", label: "Pixel 11 Pro Fold" },
  { value: "Metrics", label: "Metrics" },
  { value: "Data Fields", label: "Data Fields" },
];

const SOURCE = "new features available now";
const LOCAL = "Nom d'utilisateur ou e-mail";

export const INITIAL_PENDING_KEYS: PendingKey[] = [
  { id: "1", page: "Knowledge Center", module: "Pixel 11 Pro Fold", source: SOURCE, local: LOCAL, devKey: "" },
  { id: "2", page: "Home", module: "Metrics", source: SOURCE, local: LOCAL, devKey: "" },
  { id: "3", page: "Knowledge Center", module: "Pixel 11 Pro Fold", source: SOURCE, local: LOCAL, devKey: "" },
  { id: "4", page: "Knowledge Center", module: "Pixel 11 Pro Fold", source: SOURCE, local: LOCAL, devKey: "" },
  { id: "5", page: "Storehub", module: "Data Fields", source: SOURCE, local: LOCAL, devKey: "" },
];

const activeRow = (id: string, devKey: string, rest: Partial<ActiveRow> = {}): ActiveRow => ({
  id,
  devKey,
  source: SOURCE,
  local: LOCAL,
  preProd: false,
  prod: false,
  lockedPreProd: false,
  lockedProd: false,
  ...rest,
});

export const INITIAL_ACTIVE_ROWS: ActiveRow[] = [
  activeRow("1", "kc.head.new feature2", { flag: "updated", preProd: true, prod: true, lockedPreProd: true, lockedProd: true }),
  activeRow("2", "kc.head.new feature_new3", { flag: "new", preProd: true, lockedPreProd: true }),
  activeRow("3", "kc.head.new feature4", { flag: "updated" }),
  activeRow("4", "kc.head.new feature", { preProd: true, lockedPreProd: true }),
  activeRow("5", "kc.head.new feature"),
  activeRow("6", "kc.head.new feature"),
  activeRow("7", "kc.head.new feature"),
  activeRow("8", "kc.head.new feature", { preProd: true, lockedPreProd: true }),
];

/** Developer keys that already exist, so they cannot be assigned again. */
export const EXISTING_DEV_KEYS = ["kc.head.feature3"];

/** Returns the first key that is already taken, by an existing key or by another row. */
export function findDuplicateKey(rows: PendingKey[]): string | undefined {
  const seen = new Set(EXISTING_DEV_KEYS);
  for (const { devKey } of rows) {
    const key = devKey.trim();
    if (key === "") continue;
    if (seen.has(key)) return key;
    seen.add(key);
  }
  return undefined;
}

export function buildTabs(counts: Record<TabValue, number>): TabItem[] {
  return [
    { value: "active", label: "Active Translations", count: counts.active },
    { value: "pending", label: "Pending Translations", count: counts.pending },
    { value: "keys", label: "Pending Dev Keys", count: counts.keys },
  ];
}

export const LANGUAGE_NAMES: Record<string, string> = { FR: "French", EN: "English" };

/** Pending keys with developer keys pre-filled, in row order. Empty strings leave a row blank. */
export const withDevKeys = (keys: string[]): PendingKey[] =>
  INITIAL_PENDING_KEYS.map((row, index) => ({ ...row, devKey: keys[index] ?? "" }));

/** Rows for the Active Translations layout that applies both environments from one column. */
export const INITIAL_COMBINED_ROWS: ActiveRow[] = [
  activeRow("1", "kc.head.new feature", { prod: true, preProd: true }),
  activeRow("2", "kc.head.new feature"),
  activeRow("3", "kc.head.new feature", { preProd: true }),
  activeRow("4", "kc.head.new feature", { prod: true, preProd: true }),
  activeRow("5", "kc.head.new feature", { prod: true }),
];

export type ActiveLayout = "per-environment" | "combined";
