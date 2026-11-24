// Gallery of every component and state, plus the golden screens. Built only from @onehub/ds.
// Use ?view=components | screen-keys | screen-active | screen-error | screen-modal
import { useState } from "react";
import {
  AddButton,
  BackButton,
  Box,
  CancelButton,
  Checkbox,
  CloseButton,
  CopyKeyButton,
  CountBadge,
  DeleteButton,
  EditButton,
  ErrorBanner,
  LanguageButton,
  NewBadge,
  OpenButton,
  PublishButton,
  PublishToTestButton,
  SaveAsButton,
  SaveButton,
  SectionHeading,
  SuccessBanner,
  SuccessToast,
  VersionBadge,
  DataTable,
  DropdownCell,
  FileUpload,
  Inline,
  InputCell,
  NumberCell,
  OptionBox,
  ScreenshotCell,
  SelectField,
  Stack,
  Tabs,
  TextArea,
  TextCell,
  TextField,
  type Column,
  type FieldStatus,
  type TabItem,
  type UploadedFile,
} from "@onehub/ds";
import { TranslationScreen } from "../screens/translation";
import { withDevKeys } from "../screens/translation/data";

const FILLED_KEYS = withDevKeys(["", "kc.head.feature2", "kc.head.feature3", "kc.head.feature4", ""]);

type View =
  | "components"
  | "screen-keys"
  | "screen-filled"
  | "screen-error"
  | "screen-active"
  | "screen-environments"
  | "screen-modal";

const VIEWS: TabItem[] = [
  { value: "components", label: "Components" },
  { value: "screen-keys", label: "Screen: Pending Dev Keys" },
  { value: "screen-filled", label: "Screen: keys filled" },
  { value: "screen-error", label: "Screen: duplicate key error" },
  { value: "screen-active", label: "Screen: Active Translations" },
  { value: "screen-environments", label: "Screen: Apply to Environments" },
  { value: "screen-modal", label: "Screen: Add New Word" },
];

const initialView = (): View => {
  const requested = new URLSearchParams(window.location.search).get("view");
  return VIEWS.some((v) => v.value === requested) ? (requested as View) : "components";
};

const STATUSES: FieldStatus[] = ["default", "prompt", "valid", "error", "disabled", "readonly"];

const OPTIONS = [
  { value: "a", label: "Knowledge Center" },
  { value: "b", label: "Home" },
];

interface DemoRow {
  id: string;
  page: string;
  module: string;
  key: string;
}

const ROWS: DemoRow[] = [
  { id: "1", page: "Home", module: "a", key: "" },
  { id: "2", page: "Login", module: "b", key: "kc.head.feature2" },
  { id: "3", page: "A very long page name that does not fit in the column", module: "a", key: "kc.head.feature3" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack relation="related">
      <SectionHeading>{title}</SectionHeading>
      {children}
    </Stack>
  );
}

function Components() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [tab, setTab] = useState("pending");
  const [rows, setRows] = useState(ROWS);
  const [toast, setToast] = useState(false);

  const columns: Column<DemoRow>[] = [
    { key: "n", header: "Sr. No.", width: "xs", cell: (_r, i) => <NumberCell>{i + 1}</NumberCell> },
    { key: "shot", header: "Screenshot", width: "sm", cell: (r) => <ScreenshotCell alt={r.page} /> },
    { key: "page", header: "Page", width: "md", cell: (r) => <TextCell>{r.page}</TextCell> },
    {
      key: "module",
      header: "Module",
      width: "md",
      headerEdit: { label: "Edit module details", onClick: () => undefined },
      cell: (r) => (
        <DropdownCell
          ariaLabel="Module"
          options={OPTIONS}
          value={r.module}
          onChange={(value) => setRows((all) => all.map((x) => (x.id === r.id ? { ...x, module: value } : x)))}
        />
      ),
    },
    {
      key: "key",
      header: "Developer key",
      width: "lg",
      cell: (r) => (
        <InputCell
          ariaLabel="Developer key"
          value={r.key}
          placeholder="Enter Dev_key"
          error={r.id === "3"}
          onChange={(value) => setRows((all) => all.map((x) => (x.id === r.id ? { ...x, key: value } : x)))}
        />
      ),
    },
  ];

  return (
    <Box inset="page">
      <Stack relation="section">
        <Section title="Buttons: one component per role, all built on an internal BaseButton">
          <Stack relation="group">
            <Inline relation="group" wrap>
              <AddButton>Add New Word</AddButton>
              <SaveButton />
              <SaveAsButton target="Pending_Dev_key" />
              <CancelButton />
              <LanguageButton language="French" />
              <PublishToTestButton />
              <PublishButton environments={["Prod", "Pre-Prod"]} onSelect={() => setToast(true)} />
            </Inline>
            <Inline relation="group" wrap>
              <AddButton disabled>Add New Word</AddButton>
              <SaveButton disabled />
              <SaveAsButton target="Pending_Dev_key" disabled />
              <CancelButton disabled />
              <LanguageButton language="French" disabled />
              <PublishToTestButton disabled />
              <PublishButton environments={["Prod", "Pre-Prod"]} onSelect={() => undefined} disabled />
            </Inline>
            <Inline relation="group" wrap>
              <SaveButton loading>Saving</SaveButton>
            </Inline>
            <Inline relation="group">
              <EditButton label="Edit details" />
              <DeleteButton label="Delete" />
              <CloseButton label="Close" />
              <BackButton label="Back" />
              <CopyKeyButton label="Copy key" />
              <OpenButton label="Open" />
            </Inline>
          </Stack>
        </Section>

        <Section title="Text fields: one component, status as a prop">
          <Inline relation="group" wrap align="start">
            {STATUSES.map((status) => (
              <Box key={status} inset="none" grow>
                <TextField
                  label={`Status: ${status}`}
                  status={status}
                  defaultValue={status === "default" || status === "prompt" ? "" : "shibsadle@gmail.com"}
                  placeholder="Enter value"
                  message={status === "error" ? "Enter a valid email" : undefined}
                  required={status === "default"}
                />
              </Box>
            ))}
          </Inline>
          <Inline relation="group" align="start">
            <Box inset="none" grow>
              <SelectField label="Select Page" required options={OPTIONS} placeholder="Select Page" />
            </Box>
            <Box inset="none" grow>
              <SelectField label="Select Page (chosen)" options={OPTIONS} defaultValue="a" />
            </Box>
            <Box inset="none" grow>
              <TextField label="Search" type="search" iconLeading="search" placeholder="Search a developer key or word" />
            </Box>
          </Inline>
          <TextArea label="Local Language Translation (French)" required placeholder="Enter translation" />
        </Section>

        <Section title="Checkboxes, option boxes, upload">
          <Inline relation="group" align="start">
            <Checkbox label="Prod" />
            <Checkbox label="Pre-Prod" defaultChecked />
            <Checkbox label="Disabled" disabled />
          </Inline>
          <Inline relation="choices">
            <Box inset="none" grow>
              <OptionBox label="Prod" />
            </Box>
            <Box inset="none" grow>
              <OptionBox label="Pre-Prod" defaultChecked />
            </Box>
          </Inline>
          <Inline relation="group" align="start">
            <Box inset="none" grow>
              <FileUpload
                label="UI Screenshot"
                file={file}
                onSelect={(chosen) => setFile({ name: chosen.name, previewUrl: URL.createObjectURL(chosen) })}
                onRemove={() => setFile(null)}
              />
            </Box>
            <Box inset="none" grow>
              <FileUpload label="UI Screenshot (error)" onSelect={() => undefined} onRemove={() => undefined} error="Upload a PNG or JPG under 5 MB" />
            </Box>
          </Inline>
        </Section>

        <Section title="Badges and notifications">
          <Inline relation="group">
            <VersionBadge version={1} />
            <CountBadge count={5} />
            <NewBadge />
          </Inline>
          <ErrorBanner title="Duplicate developer key detected">
            The developer key "kc.head.feature3" already exists. Please change it before saving.
          </ErrorBanner>
          <SuccessBanner title="Keys Assigned Successfully!">Keys successfully assigned and moved to Active Translations</SuccessBanner>
          {toast ? (
            <SuccessToast title="Published" onDismiss={() => setToast(false)}>
              Floating toast, top right.
            </SuccessToast>
          ) : null}
        </Section>

        <Section title="Tabs and table">
          <Tabs
            ariaLabel="Demo tabs"
            value={tab}
            onChange={setTab}
            items={[
              { value: "pending", label: "Pending Dev Keys", count: 5 },
              { value: "active", label: "Active Translations", count: 12 },
              { value: "archived", label: "Archived", count: 3 },
            ]}
          />
          <DataTable ariaLabel="Demo table" columns={columns} rows={rows} getRowKey={(r) => r.id} />
          <DataTable ariaLabel="Empty demo table" columns={columns.slice(0, 3)} rows={[]} getRowKey={(r: DemoRow) => r.id} />
        </Section>
      </Stack>
    </Box>
  );
}

export function Gallery() {
  const [view, setView] = useState<View>(initialView);
  return (
    <Stack relation="related">
      <Tabs items={VIEWS} value={view} onChange={(value) => setView(value as View)} ariaLabel="Gallery view" />
      {view === "components" ? <Components /> : null}
      {view === "screen-keys" ? <TranslationScreen initialTab="keys" /> : null}
      {view === "screen-filled" ? <TranslationScreen initialTab="keys" initialPendingKeys={FILLED_KEYS} /> : null}
      {view === "screen-error" ? (
        <TranslationScreen initialTab="keys" initialPendingKeys={FILLED_KEYS} initialRejectedKey="kc.head.feature3" />
      ) : null}
      {view === "screen-active" ? <TranslationScreen initialTab="active" toastOpen /> : null}
      {view === "screen-environments" ? <TranslationScreen initialTab="active" activeLayout="combined" /> : null}
      {view === "screen-modal" ? <TranslationScreen initialTab="keys" modalOpen /> : null}
    </Stack>
  );
}
