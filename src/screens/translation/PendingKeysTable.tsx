import { DataTable, DropdownCell, InputCell, NumberCell, ScreenshotCell, TextCell, type Column } from "@onehub/ds";
import sampleScreenshot from "./assets/sample-screenshot.svg";
import { MODULES, type PendingKey } from "./data";

interface PendingKeysTableProps {
  rows: PendingKey[];
  /** A developer key that is already taken. Its cell shows the error state. */
  duplicateKey?: string;
  onChange: (id: string, patch: Partial<PendingKey>) => void;
  onEditModules: () => void;
}

export function PendingKeysTable({ rows, duplicateKey, onChange, onEditModules }: PendingKeysTableProps) {
  const columns: Column<PendingKey>[] = [
    { key: "no", header: "Sr. No.", width: "2xs", cell: (_row, index) => <NumberCell>{index + 1}</NumberCell> },
    { key: "shot", header: "UI Mockup Screenshot", width: "md", cell: (row) => <ScreenshotCell src={sampleScreenshot} alt={`Screenshot for ${row.page}`} /> },
    { key: "page", header: "Page", width: "2xl", cell: (row) => <TextCell>{row.page}</TextCell> },
    {
      key: "module",
      header: "Module",
      width: "3xl",
      headerEdit: { label: "Edit module details", onClick: onEditModules },
      cell: (row) => (
        <DropdownCell
          ariaLabel={`Module for ${row.page}`}
          options={MODULES}
          value={row.module}
          onChange={(module) => onChange(row.id, { module })}
        />
      ),
    },
    { key: "source", header: "English Source Text", width: "xl", cell: (row) => <TextCell>{row.source}</TextCell> },
    { key: "local", header: "Local Language", width: "3xl", cell: (row) => <TextCell>{row.local}</TextCell> },
    {
      key: "devKey",
      header: "Developer key",
      width: "4xl",
      cell: (row) => (
        <InputCell
          ariaLabel={`Developer key for row ${row.id}`}
          value={row.devKey}
          placeholder="Enter Dev_key"
          error={duplicateKey !== undefined && row.devKey.trim() === duplicateKey}
          onChange={(devKey) => onChange(row.id, { devKey })}
        />
      ),
    },
  ];

  return <DataTable ariaLabel="Pending developer keys" columns={columns} rows={rows} getRowKey={(row) => row.id} />;
}
