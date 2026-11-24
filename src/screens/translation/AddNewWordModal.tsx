import { useState } from "react";
import { Box, CancelButton, FileUpload, GroupLabel, Inline, Modal, ModalFooter, OptionBox, SaveAsButton, SelectField, Stack, TextArea, TextField, type UploadedFile } from "@onehub/ds";
import { PAGES, MODULES, type PendingKey } from "./data";

interface AddNewWordModalProps {
  /** Language the translation is written in, shown in the field label. */
  languageName: string;
  onClose: () => void;
  onSave: (word: Omit<PendingKey, "id" | "devKey">) => void;
}

export function AddNewWordModal({ languageName, onClose, onSave }: AddNewWordModalProps) {
  const [page, setPage] = useState(PAGES[0]?.value ?? "");
  const [module, setModule] = useState("");
  const [source, setSource] = useState("");
  const [local, setLocal] = useState("");
  const [screenshot, setScreenshot] = useState<UploadedFile | null>(null);

  const canSave = page !== "" && source.trim() !== "" && local.trim() !== "";

  return (
    <Modal
      title="Add New Word"
      onClose={onClose}
      footer={
        <ModalFooter
          start={<CancelButton onClick={onClose} />}
          end={<SaveAsButton target="Pending_Dev_key" disabled={!canSave} onClick={() => onSave({ page, module, source, local })} />}
        />
      }
    >
      <Stack relation="group">
        <Inline relation="group" align="start">
          <Box inset="none" grow>
            <SelectField label="Select Page" required options={PAGES} value={page} onChange={setPage} />
          </Box>
          <Box inset="none" grow>
            <SelectField label="Select Module" options={MODULES} placeholder="Select Module" value={module} onChange={setModule} />
          </Box>
        </Inline>
        <TextField label="English Source Text" required placeholder="Enter source text" value={source} onChange={setSource} />
        <TextArea label={`Local Language Translation (${languageName})`} required placeholder="Enter translation" value={local} onChange={setLocal} />
        <FileUpload
          label="UI Screenshot"
          file={screenshot}
          onSelect={(file) => setScreenshot({ name: file.name, previewUrl: URL.createObjectURL(file) })}
          onRemove={() => setScreenshot(null)}
        />
        <Stack relation="related">
          <GroupLabel>
            Save on Environment
          </GroupLabel>
          <Inline relation="choices">
            <Box inset="none" grow>
              <OptionBox label="Prod" defaultChecked />
            </Box>
            <Box inset="none" grow>
              <OptionBox label="Pre-Prod" defaultChecked />
            </Box>
          </Inline>
        </Stack>
      </Stack>
    </Modal>
  );
}
