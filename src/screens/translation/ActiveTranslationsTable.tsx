import { DataTable, DevKeyCell, EnvironmentCell, IconButton, InputCell, NumberCell, TextCell, type Column } from "@onehub/ds";
import type { ActiveRow } from "./data";

interface ActiveTranslationsTableProps {
  rows: ActiveRow[];
  onChange: (id: string, patch: Partial<ActiveRow>) => void;
  onCopyKey: (devKey: string) => void;
  onOpen: (row: ActiveRow) => void;
}

export function ActiveTranslationsTable({ rows, onChange, onCopyKey, onOpen }: ActiveTranslationsTableProps) {
  const columns: Column<ActiveRow>[] = [
    { key: "no", header: "Sr. No.", width: "xs", cell: (_row, index) => <NumberCell>{index + 1}</NumberCell> },
    {
      key: "devKey",
      header: "Developer key",
      width: "md",
      cell: (row) => <DevKeyCell devKey={row.devKey} flag={row.flag} onCopy={() => onCopyKey(row.devKey)} />,
    },
    { key: "source", header: "English SourceText", width: "sm", cell: (row) => <TextCell lines={2}>{row.source}</TextCell> },
    {
      key: "local",
      header: "Local Language",
      width: "sm",
      cell: (row) => (
        <InputCell
          ariaLabel={`Local language for ${row.devKey}`}
          value={row.local}
          onChange={(local) => onChange(row.id, { local })}
        />
      ),
    },
    {
      key: "preProd",
      header: "Apply on Pre-Prod Env",
      width: "sm",
      cell: (row) => (
        <EnvironmentCell
          environment="Pre-Prod"
          ariaLabel={`Apply ${row.devKey} on Pre-Prod`}
          checked={row.preProd}
          locked={row.lockedPreProd}
          onChange={(preProd) => onChange(row.id, { preProd })}
        />
      ),
    },
    {
      key: "prod",
      header: "Apply on Prod Env",
      width: "sm",
      cell: (row) => (
        <EnvironmentCell
          environment="Prod"
          ariaLabel={`Apply ${row.devKey} on Prod`}
          checked={row.prod}
          locked={row.lockedProd}
          onChange={(prod) => onChange(row.id, { prod })}
        />
      ),
    },
    {
      key: "action",
      header: "Action",
      width: "xs",
      cell: (row) => <IconButton action="open" label={`Open ${row.devKey}`} onClick={() => onOpen(row)} />,
    },
  ];

  return <DataTable ariaLabel="Active translations" columns={columns} rows={rows} getRowKey={(row) => row.id} />;
}
