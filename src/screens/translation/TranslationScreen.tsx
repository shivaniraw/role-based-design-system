import { useState } from "react";
import {
  AddButton,
  AppShell,
  BackButton,
  Box,
  CancelButton,
  Card,
  EmptyMessage,
  ErrorBanner,
  Inline,
  LeftNav,
  Page,
  PageTitle,
  PublishButton,
  PublishToTestButton,
  SaveButton,
  SelectField,
  Split,
  Stack,
  SuccessToast,
  Tabs,
  TextField,
  TopBar,
  VersionBadge,
} from "@onehub/ds";
import { ActiveTranslationsCombinedTable } from "./ActiveTranslationsCombinedTable";
import { ActiveTranslationsTable } from "./ActiveTranslationsTable";
import { AddNewWordModal } from "./AddNewWordModal";
import { PendingKeysTable } from "./PendingKeysTable";
import {
  INITIAL_ACTIVE_ROWS,
  INITIAL_COMBINED_ROWS,
  INITIAL_PENDING_KEYS,
  LANGUAGES,
  LANGUAGE_NAMES,
  MODULES,
  NAV_ITEMS,
  PAGES,
  buildTabs,
  findDuplicateKey,
  type ActiveLayout,
  type ActiveRow,
  type PendingKey,
  type TabValue,
} from "./data";

export interface TranslationScreenProps {
  initialTab?: TabValue;
  /** Pre-fills the Pending Dev Keys table, for example to show the duplicate-key error. */
  initialPendingKeys?: PendingKey[];
  /** A developer key the server already rejected as a duplicate. Shows the error state. */
  initialRejectedKey?: string;
  /** Which Active Translations layout to show. */
  activeLayout?: ActiveLayout;
  /** Opens the Add New Word modal. */
  modalOpen?: boolean;
  /** Shows the success toast on load. */
  toastOpen?: boolean;
}

const KEYS_ASSIGNED_TOAST = {
  title: "Keys Assigned Successfully!",
  detail: "Keys successfully assigned and moved to Active Translations",
};

export function TranslationScreen({
  initialTab = "keys",
  initialPendingKeys = INITIAL_PENDING_KEYS,
  initialRejectedKey,
  activeLayout = "per-environment",
  modalOpen = false,
  toastOpen = false,
}: TranslationScreenProps) {
  const [language, setLanguage] = useState("FR");
  const [navId, setNavId] = useState("testing");
  const [tab, setTab] = useState<TabValue>(initialTab);
  const [pendingKeys, setPendingKeys] = useState(initialPendingKeys);
  const initialActiveRows = activeLayout === "combined" ? INITIAL_COMBINED_ROWS : INITIAL_ACTIVE_ROWS;
  const [activeRows, setActiveRows] = useState(initialActiveRows);
  const [rejectedKey, setRejectedKey] = useState(initialRejectedKey);
  const [pageFilter, setPageFilter] = useState(activeLayout === "combined" ? "Knowledge Center" : "all");
  const [moduleFilter, setModuleFilter] = useState(activeLayout === "combined" ? "Pixel 11 Pro Fold" : "");
  const [activeEdited, setActiveEdited] = useState(false);
  const [addingWord, setAddingWord] = useState(modalOpen);
  const [toast, setToast] = useState<{ title: string; detail: string } | null>(toastOpen ? KEYS_ASSIGNED_TOAST : null);

  const hasAssignedKeys = pendingKeys.some((row) => row.devKey.trim() !== "");
  const canSave = tab === "keys" ? hasAssignedKeys && rejectedKey === undefined : tab === "active" && activeEdited;

  const updatePendingKey = (id: string, patch: Partial<PendingKey>) => {
    setPendingKeys((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
    // Editing the rejected key clears its error.
    if (patch.devKey !== undefined) setRejectedKey(undefined);
  };

  const updateActiveRow = (id: string, patch: Partial<ActiveRow>) => {
    setActiveRows((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
    setActiveEdited(true);
  };

  /** Keys that now have a developer key move to Active Translations. */
  const saveAssignedKeys = () => {
    const duplicate = findDuplicateKey(pendingKeys);
    if (duplicate !== undefined) {
      setRejectedKey(duplicate);
      return;
    }
    const assigned = pendingKeys.filter((row) => row.devKey.trim() !== "");
    const moved: ActiveRow[] = assigned.map((row) => ({
      id: `moved-${row.id}`,
      devKey: row.devKey.trim(),
      flag: "new",
      source: row.source,
      local: row.local,
      preProd: false,
      prod: false,
      lockedPreProd: false,
      lockedProd: false,
    }));
    setActiveRows((rows) => [...moved, ...rows]);
    setPendingKeys((rows) => rows.filter((row) => row.devKey.trim() === ""));
    setToast(KEYS_ASSIGNED_TOAST);
  };

  const saveActiveRows = () => {
    setActiveEdited(false);
    setToast({ title: "Changes saved", detail: "Your translations were saved." });
  };

  const toggleAllEnvironments = (checked: boolean) => {
    setActiveRows((rows) => rows.map((row) => ({ ...row, prod: checked, preProd: checked })));
    setActiveEdited(true);
  };

  const publishTo = (environment: string) =>
    setToast({ title: `Published to ${environment}`, detail: "Your translations are now live." });

  const cancelEdits = () => {
    setPendingKeys(initialPendingKeys);
    setRejectedKey(initialRejectedKey);
    setActiveRows(initialActiveRows);
    setActiveEdited(false);
  };

  const addPendingWord = (word: Omit<PendingKey, "id" | "devKey">) => {
    setPendingKeys((rows) => [...rows, { ...word, id: `new-${rows.length + 1}`, devKey: "" }]);
    setAddingWord(false);
    setTab("keys");
  };

  const tabs = buildTabs({ active: activeRows.length, pending: 5, keys: pendingKeys.length });

  return (
    <>
      <AppShell
        nav={
          <LeftNav
            appName="OneHub"
            language={language}
            languageOptions={LANGUAGES}
            onLanguageChange={setLanguage}
            sectionLabel="All Apps"
            items={NAV_ITEMS}
            selectedId={navId}
            onSelect={setNavId}
          />
        }
        header={<TopBar breadcrumb={[{ label: "Translation Management System" }]} userName="User Name" userSubtitle="Admin" />}
      >
        <Page>
          <Card
            footer={
              <Split
                minRelation="region"
                start={<CancelButton onClick={cancelEdits} />}
                end={
                  tab === "active" && activeLayout === "combined" ? (
                    <Inline relation="related">
                      <SaveButton disabled={!canSave} onClick={saveActiveRows} />
                      <PublishButton environments={["Prod", "Pre-Prod"]} onSelect={publishTo} disabled={!canSave} />
                    </Inline>
                  ) : tab === "active" ? (
                    <Inline relation="related">
                      <SaveButton disabled={!canSave} onClick={saveActiveRows}>
                        Preview &amp; Save
                      </SaveButton>
                      <PublishToTestButton disabled={!canSave} />
                    </Inline>
                  ) : (
                    <SaveButton disabled={!canSave} onClick={saveAssignedKeys} />
                  )
                }
              />
            }
          >
            <Stack relation="region">
              <Split
                minRelation="group"
                align="start"
                start={
                  <Inline relation="related" align="start">
                    <BackButton label="Back" />
                    <Stack relation="subtext">
                      <PageTitle>Select the page or module you want to translate</PageTitle>
                      <VersionBadge version={1} published="Published on: 23 Apr 2026, 15:30 IST by Admin" />
                    </Stack>
                  </Inline>
                }
                end={
                  <Inline relation="related">
                    <AddButton>Add Dev_key</AddButton>
                    <AddButton onClick={() => setAddingWord(true)}>Add New Word</AddButton>
                  </Inline>
                }
              />

              <Stack relation="group">
                <Inline relation="group">
                  <Box inset="none" grow>
                    <TextField ariaLabel="Search a developer key or word" type="search" iconLeading="search" placeholder="Search a developer key or word" />
                  </Box>
                  <TextField ariaLabel="Language" status="readonly" value={LANGUAGE_NAMES[language] ?? language} iconTrailing="lock" />
                </Inline>
                <Inline relation="group">
                  <Box inset="none" grow>
                    <SelectField ariaLabel="Page" options={[{ value: "all", label: "All" }, ...PAGES]} value={pageFilter} onChange={setPageFilter} />
                  </Box>
                  <Box inset="none" grow>
                    <SelectField ariaLabel="Module" options={MODULES} placeholder="Select Module" value={moduleFilter} onChange={setModuleFilter} />
                  </Box>
                </Inline>
                {rejectedKey !== undefined ? (
                  <ErrorBanner title="Duplicate developer key detected">
                    {`The developer key "${rejectedKey}" already exists. Please change it before saving.`}
                  </ErrorBanner>
                ) : null}
              </Stack>

              <Stack relation="group">
                <Tabs items={tabs} value={tab} onChange={(value) => setTab(value as TabValue)} ariaLabel="Translation status" />
                {tab === "keys" ? (
                  <PendingKeysTable rows={pendingKeys} duplicateKey={rejectedKey} onChange={updatePendingKey} onEditModules={() => undefined} />
                ) : null}
                {tab === "active" && activeLayout === "combined" ? (
                  <ActiveTranslationsCombinedTable
                    rows={activeRows}
                    onChange={updateActiveRow}
                    onToggleAll={toggleAllEnvironments}
                    onCopyKey={(devKey) => void navigator.clipboard?.writeText(devKey)}
                  />
                ) : null}
                {tab === "active" && activeLayout === "per-environment" ? (
                  <ActiveTranslationsTable
                    rows={activeRows}
                    onChange={updateActiveRow}
                    onCopyKey={(devKey) => void navigator.clipboard?.writeText(devKey)}
                    onOpen={() => undefined}
                  />
                ) : null}
                {tab === "pending" ? <EmptyMessage>No pending translations.</EmptyMessage> : null}
              </Stack>
            </Stack>
          </Card>
        </Page>
      </AppShell>

      {addingWord ? <AddNewWordModal languageName={LANGUAGE_NAMES[language] ?? language} onClose={() => setAddingWord(false)} onSave={addPendingWord} /> : null}
      {toast ? (
        <SuccessToast title={toast.title} onDismiss={() => setToast(null)}>
          {toast.detail}
        </SuccessToast>
      ) : null}
    </>
  );
}
