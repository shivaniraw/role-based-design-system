import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import { Badge } from "./Badge";
import { Checkbox, OptionBox } from "./Checkbox";
import { IconButton } from "./IconButton";
import { SelectField, TextArea, TextField, type FieldStatus, type SelectOption } from "./Field";

export type ColumnWidth = "xs" | "sm" | "md" | "lg" | "xl";

const MIN_WIDTH: Record<ColumnWidth, string> = {
  xs: "min-w-col-xs",
  sm: "min-w-col-sm",
  md: "min-w-col-md",
  lg: "min-w-col-lg",
  xl: "min-w-col-xl",
};

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

/**
 * The table scrolls sideways inside its card. The blue header and row lines are built in.
 * Cell content comes from the cell components exported below.
 */
export function DataTable<Row>({ columns, rows, getRowKey, ariaLabel, emptyMessage = "Nothing to show yet." }: DataTableProps<Row>) {
  return (
    <div className="ds-scroll overflow-x-auto rounded-field border border-border">
      <table aria-label={ariaLabel} className="w-full border-collapse">
        <thead>
          <tr className="h-header-row-h bg-action text-left text-table font-medium text-on-action">
            {columns.map((column) => (
              <th key={column.key} scope="col" className={cx("px-inset-field-x font-medium", MIN_WIDTH[column.width])}>
                <div className="flex items-center justify-between gap-attached">
                  {column.header}
                  {column.headerEdit ? (
                    <IconButton
                      action="edit"
                      surface="onAction"
                      label={column.headerEdit.label}
                      onClick={column.headerEdit.onClick}
                    />
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="h-row-h bg-surface-subtle">
              <td colSpan={columns.length} className="px-inset-field-x text-center text-table text-text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className="h-row-h border-t border-border bg-surface-subtle">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="border-r border-border px-inset-field-x align-middle text-table text-text last:border-r-0"
                  >
                    {column.cell(row, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Long text is cut with an ellipsis (one line by default, or two with `lines={2}`); the full text is in the tooltip.
 * `dir="auto"` handles right-to-left text.
 */
export function TextCell({ children, lines = 1 }: { children: string; lines?: 1 | 2 }) {
  return (
    <div dir="auto" title={children} className={cx("max-w-col-md", lines === 2 ? "line-clamp-2" : "truncate")}>
      {children}
    </div>
  );
}

export function NumberCell({ children }: { children: number }) {
  return <div className="text-center tabular-nums">{children}</div>;
}

/** A small preview of an uploaded UI screenshot. */
export function ScreenshotCell({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-screenshot-h w-screenshot-w items-center justify-center overflow-hidden rounded-badge border border-border bg-neutral-surface">
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
  return <SelectField ariaLabel={ariaLabel} options={options} value={value} onChange={onChange} />;
}

/**
 * Text input in a cell. Border shows the state: blue while empty (waiting), neutral when filled,
 * red when `error` is set.
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
  const status: FieldStatus = error ? "error" : value === "" ? "prompt" : "default";
  return <TextField ariaLabel={ariaLabel} value={value} placeholder={placeholder} status={status} onChange={onChange} />;
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
 * `flag` marks keys that changed recently: "new" shows a green "New" pill, "updated" a green dot.
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
      <div className="relative flex min-w-zero grow flex-col items-start gap-subtext">
        {flag === "new" ? <Badge kind="new">New</Badge> : null}
        {flag === "updated" ? (
          <span aria-label="Recently updated" className="absolute -top-subtext left-attached size-attached rounded-pill bg-feedback-success" />
        ) : null}
        <div dir="auto" title={devKey} className="break-words rounded-badge bg-neutral-surface px-inset-badge-x py-subtext text-caption text-text-secondary">
          {devKey}
        </div>
      </div>
      <IconButton action="copy-key" label={`Copy key ${devKey}`} onClick={onCopy} />
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
