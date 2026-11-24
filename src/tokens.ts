/**
 * Closed role vocabularies and their Tailwind class maps.
 *
 * Class names are written out in full (never built dynamically) so Tailwind can see them.
 * Screens never import this file; they pass the role names to components as props.
 */

/** The 8 gap rules from the OneHub spacing doc, in the doc's check order. */
export const RELATIONS = [
  "subtext", // 6  - a line of text and the smaller line under it
  "iconLabel", // 12 - an icon or checkbox and its text label
  "attached", // 8  - other parts of one element
  "choices", // 20 - big clickable boxes in a set (option boxes). Not tabs
  "related", // 12 - a pair doing one job, list items (nav items), a heading and its list
  "group", // 28 - different groups in the same area (field to field, tab to tab)
  "region", // 44 - main blocks of a modal or card
  "section", // 80 - different sections of a page
] as const;
export type Relation = (typeof RELATIONS)[number];

export const GAP: Record<Relation, string> = {
  subtext: "gap-subtext",
  iconLabel: "gap-icon-label",
  attached: "gap-attached",
  choices: "gap-choices",
  related: "gap-related",
  group: "gap-group",
  region: "gap-region",
  section: "gap-section",
};

/** Padding roles from the spacing doc (9 insets). Exceptions live inside their components. */
export const INSETS = [
  "none",
  "page", // 36 all sides: page frame
  "pageX", // 36 left/right: header
  "panel", // 40 all sides: modal
  "container", // 16 x / 14 y: boxes that hold other things (sidebar)
  "control", // 22 x / 10 y: nav items, text areas
  "controlX", // 22 left/right only: logo row, "All Apps" heading
  "field", // 12 left/right: inputs, dropdowns, table cells
  "textarea", // 12 x / 10 y
  "button", // 20 left/right
  "badge", // 8 left/right
] as const;
export type Inset = (typeof INSETS)[number];

export const PADDING: Record<Inset, string> = {
  none: "",
  page: "p-inset-page",
  pageX: "px-inset-page",
  panel: "p-inset-panel",
  container: "px-inset-container-x py-inset-container-y",
  control: "px-inset-control-x py-inset-control-y",
  controlX: "px-inset-control-x",
  field: "px-inset-field-x",
  textarea: "px-inset-field-x py-inset-control-y",
  button: "px-inset-button-x",
  badge: "px-inset-badge-x",
};

export type Align = "start" | "center" | "end" | "stretch";
export const ALIGN: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

/** Props every layout primitive accepts besides its role props. No className, no style. */
export interface BaseProps {
  children?: React.ReactNode;
  id?: string;
  "aria-label"?: string;
  "data-testid"?: string;
}
