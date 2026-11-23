import { Checkbox, DataTable, DevKeyCell, EnvironmentPairCell, TextAreaCell, TextCell, type Column } from "@onehub/ds";
import type { ActiveRow } from "./data";

interface ActiveTranslationsCombinedTableProps {
  rows: ActiveRow[];
  onChange: (id: string, patch: Partial<ActiveRow>) => void;
  onToggleAll: (checked: boolean) => void;
  onCopyKey: (devKey: string) => void;
}

/** Active Translations with Prod and Pre-Prod in one "Apply to Environments" column. */
export function ActiveTranslationsCombinedTable({ rows, onChange, onToggleAll, onCopyKey }: ActiveTranslationsCombinedTableProps) {
  const allApplied = rows.length > 0 && rows.every((row) => row.prod && row.preProd);

  const columns: Column<ActiveRow>[] = [
    {
      key: "devKey",
      header: "Developer key",
      width: "md",
      cell: (row) => <DevKeyCell devKey={row.devKey} onCopy={() => onCopyKey(row.devKey)} />,
    },
    { key: "source", header: "English SourceText", width: "md", cell: (row) => <TextCell lines={2}>{row.source}</TextCell> },
    {
      key: "local",
      header: "Local Language",
      width: "lg",
      cell: (row) => (
        <TextAreaCell ariaLabel={`Local language for ${row.devKey}`} value={row.local} onChange={(local) => onChange(row.id, { local })} />
      ),
    },
    {
      key: "environments",
      header: <Checkbox label="Apply to Environments" checked={allApplied} onChange={onToggleAll} onAction />,
      width: "xl",
      cell: (row) => (
        <EnvironmentPairCell
          ariaLabel={`Apply ${row.devKey} to environments`}
          prod={row.prod}
          preProd={row.preProd}
          onChange={(patch) => onChange(row.id, patch)}
        />
      ),
    },
  ];

  return <DataTable ariaLabel="Active translations" columns={columns} rows={rows} getRowKey={(row) => row.id} />;
}
