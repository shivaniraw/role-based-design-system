import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import { Checkbox, OptionBox } from "./Checkbox";
import { NewBadge } from "./badges/NewBadge";
import { BaseIconButton } from "./icon-buttons/BaseIconButton";
import { CopyKeyButton } from "./icon-buttons/CopyKeyButton";
import { TextArea } from "./Field";
import { Listbox, type SelectOption } from "./select/Listbox";

/**
 * Minimum column widths from the Figma tables: 2xs 66, xs 96, sm 126, md 138, lg 174, xl 200,
 * 2xl 214, 3xl 221, 4xl 300. Columns grow evenly when there is room.
 */
export type ColumnWidth = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

export interface Column<Row> {
  key: string;
  header: ReactNode;
  width: ColumnWidth;
  /** Pencil icon in the header: "edit details". */
  headerEdit?: { label: string; onClick: () => void };
  cell: (row: Row, index: number) => ReactNode;
}

export interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
  /** Accessible name of the table. */
  ariaLabel: string;
  emptyMessage?: string;
}

const track = (width: ColumnWidth) => `var(--spacing-col-${width})`;

/**
 * Figma: Data Table (32:184).
 * - Box: radius 12, 1px #E5E7EB, clips its content.
 * - Header: 67 tall, #4C86F9, Table/Header 16 Medium white at -2%, 16 side padding, white dividers.
 * - Rows: 60 tall (content centered, no vertical padding), striped #F9FAFB / white starting grey, #E5E7EB row lines, #BABABA column dividers,
 *   12 side padding, Body/14 #333333.
 * - Wider than its card: it scrolls sideways, with the 12px scrollbar sitting below the table.
 */
export function DataTable<Row>({ columns, rows, getRowKey, ariaLabel, emptyMessage = "Nothing to show yet." }: DataTableProps<Row>) {
  const template = columns.map((column) => `minmax(${track(column.width)}, 1fr)`).join(" ");
  const minWidth = `calc(${columns.map((column) => track(column.width)).join(" + ")} + 2 * var(--spacing-hairline))`;
  const last = columns.length - 1;

  return (
    <div className="ds-scroll overflow-x-auto pb-attached">
      <div role="table" aria-label={ariaLabel} style={{ minWidth }} className="overflow-hidden rounded-table border border-border-subtle bg-surface-card">
        <div role="rowgroup">
          <div role="row" style={{ gridTemplateColumns: template }} className="grid h-header-row-h bg-action-strong">
            {columns.map((column, index) => (
              <div
                key={column.key}
                role="columnheader"
                className={cx(
                  "flex min-w-zero items-center gap-attached px-inset-container-x text-input font-medium tracking-tight text-on-action",
                  index !== last && "border-r border-on-action",
                )}
              >
                <span className="min-w-zero grow">{column.header}</span>
                {column.headerEdit ? (
                  <BaseIconButton icon="pencil" tone="onAction" label={column.headerEdit.label} onClick={column.headerEdit.onClick} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div role="rowgroup">
          {rows.length === 0 ? (
            <div role="row" className="flex h-row-h items-center justify-center bg-surface-subtle text-table text-text-muted">
              <div role="cell">{emptyMessage}</div>
            </div>
          ) : (
            rows.map((row, rowIndex) => (
              <div
                key={getRowKey(row, rowIndex)}
                role="row"
                style={{ gridTemplateColumns: template }}
                className={cx(
                  "grid min-h-row-h",
                  rowIndex % 2 === 0 ? "bg-surface-subtle" : "bg-surface-card",
                  rowIndex !== rows.length - 1 && "border-b border-border-subtle",
                )}
              >
                {columns.map((column, index) => (
                  <div
                    key={column.key}
                    role="cell"
                    className={cx(
                      "flex min-w-zero items-center px-inset-field-x text-table text-text",
                      index !== last && "border-r border-border-divider",
                    )}
                  >
                    {column.cell(row, rowIndex)}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Body/14 #333333. Long text is cut with an ellipsis (one line by default, or two with `lines={2}`);
 * the full text is in the tooltip. `dir="auto"` handles right-to-left text.
 */
export function TextCell({ children, lines = 1 }: { children: string; lines?: 1 | 2 }) {
  return (
    <div dir="auto" title={children} className={cx("w-full", lines === 2 ? "line-clamp-2" : "truncate")}>
      {children}
    </div>
  );
}

export function NumberCell({ children }: { children: number }) {
  return <div className="w-full text-center tabular-nums">{children}</div>;
}

/** Figma: 31 x 61.5 thumbnail, radius 2, #BDBDBD hairline, #ECECEC when empty. */
export function ScreenshotCell({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-screenshot-h w-screenshot-w items-center justify-center overflow-hidden rounded-thumb border border-border-control bg-placeholder-bg">
        {src ? <img src={src} alt={alt} className="size-full object-cover" /> : null}
      </div>
    </div>
  );
}

export function DropdownCell({
  ariaLabel,
  options,
  value,
  onChange,
}: {
  ariaLabel: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return <Listbox look="cell" ariaLabel={ariaLabel} options={options} value={value} onChange={onChange} />;
}

/**
 * Figma: dev key input. 42 tall, radius 6, 6 padding, Body/14, #999999 placeholder.
 * Border shows the state: #4C86F9 while empty (waiting for a key), #BDBDBD when filled, red on error.
 */
export function InputCell({
  ariaLabel,
  value,
  placeholder,
  error,
  onChange,
}: {
  ariaLabel: string;
  value: string;
  placeholder?: string;
  error?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      dir="auto"
      aria-label={ariaLabel}
      aria-invalid={error || undefined}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cx(
        "h-cell-input-h w-full min-w-zero rounded-badge border bg-surface-card px-cell-input-x text-body text-text outline-none placeholder:text-text-placeholder focus-visible:outline-2 focus-visible:outline-action",
        error ? "border-feedback-error" : value === "" ? "border-action-strong" : "border-border-control",
      )}
    />
  );
}

export function CheckboxCell({
  ariaLabel,
  checked,
  onChange,
}: {
  ariaLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return <Checkbox ariaLabel={ariaLabel} checked={checked} onChange={onChange} />;
}

/**
 * A developer key shown as a chip with a "copy key" button.
 * `flag` marks keys that changed recently: "new" shows a green "New" pill on the chip's top-right corner, "updated" a green dot.
 */
export function DevKeyCell({
  devKey,
  flag,
  onCopy,
}: {
  devKey: string;
  flag?: "new" | "updated";
  onCopy?: () => void;
}) {
  return (
    <div className="flex items-center gap-related">
      <div className="relative flex min-w-zero grow flex-col items-start">
        {flag === "updated" ? (
          <span aria-label="Recently updated" className="absolute -top-subtext left-attached size-attached rounded-pill bg-feedback-success" />
        ) : null}
        <div className="relative w-full">
          <div
            dir="auto"
            title={devKey}
            className={cx(
              "break-words rounded-badge border border-border bg-neutral-surface px-inset-badge-x py-subtext text-caption text-text-secondary",
              flag === "new" && "pt-new-badge-clear",
            )}
          >
            {devKey}
          </div>
          {flag === "new" ? (
            <span className="absolute -top-subtext -right-subtext">
              <NewBadge />
            </span>
          ) : null}
        </div>
      </div>
      <CopyKeyButton label={`Copy key ${devKey}`} onClick={onCopy} />
    </div>
  );
}

/**
 * One environment (Prod or Pre-Prod) in a table row.
 * `locked` means the translation is already live there, so it can no longer be changed.
 */
export function EnvironmentCell({
  environment,
  ariaLabel,
  checked,
  locked,
  onChange,
}: {
  environment: "Prod" | "Pre-Prod";
  ariaLabel: string;
  checked: boolean;
  locked?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div aria-label={ariaLabel} role="group">
      <OptionBox label={environment} checked={checked} disabled={locked} onChange={onChange} />
    </div>
  );
}

/** A multi-line text box inside a table cell. */
export function TextAreaCell({
  ariaLabel,
  value,
  onChange,
}: {
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return <TextArea ariaLabel={ariaLabel} value={value} onChange={onChange} />;
}

/** Prod and Pre-Prod side by side in one cell. */
export function EnvironmentPairCell({
  ariaLabel,
  prod,
  preProd,
  onChange,
}: {
  ariaLabel: string;
  prod: boolean;
  preProd: boolean;
  onChange: (patch: { prod?: boolean; preProd?: boolean }) => void;
}) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex items-center gap-related">
      <OptionBox label="Prod" checked={prod} onChange={(checked) => onChange({ prod: checked })} />
      <OptionBox label="Pre-Prod" checked={preProd} onChange={(checked) => onChange({ preProd: checked })} />
    </div>
  );
}
