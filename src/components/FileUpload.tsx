import { useId, useState, type DragEvent } from "react";
import { Icon } from "../icons";
import { cx } from "../lib/cx";
import { Stack } from "../primitives/Stack";
import { BaseText } from "../primitives/text/BaseText";
import { DeleteButton } from "./icon-buttons/DeleteButton";

export interface UploadedFile {
  name: string;
  previewUrl?: string;
}

export interface FileUploadProps {
  label: string;
  file?: UploadedFile | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  /** Error text. Turns the border red. */
  error?: string;
  accept?: string;
  disabled?: boolean;
}

/** Empty, drag-over, filled and error states. The drag-over and error looks are derived (not in Figma yet). */
export function FileUpload({ label, file, onSelect, onRemove, error, accept = "image/*", disabled }: FileUploadProps) {
  const id = useId();
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files[0];
    if (dropped && !disabled) onSelect(dropped);
  };

  return (
    <Stack relation="related">
      <label htmlFor={id} className="text-body font-medium text-text-secondary">
        {label}
      </label>
      <Stack relation="subtext">
        <div
          className={cx(
            "relative flex h-upload-h items-center justify-center rounded-field border border-dashed bg-surface-card",
            error ? "border-feedback-error" : dragging ? "border-action bg-action-tint" : "border-border",
          )}
        >
          {file ? (
            <>
              {file.previewUrl ? (
                <img src={file.previewUrl} alt={file.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <BaseText variant="body" tone="secondary">
                  {file.name}
                </BaseText>
              )}
              <div className="absolute top-attached right-attached">
                <DeleteButton label={`Remove ${file.name}`} onClick={onRemove} />
              </div>
            </>
          ) : (
            <label
              htmlFor={id}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className="flex size-full cursor-pointer flex-col items-center justify-center gap-related text-text-secondary has-focus-visible:outline-2 has-focus-visible:outline-action"
            >
              <Icon name="upload" />
              <BaseText variant="body" tone="secondary">
                Click to upload or <span className="underline">Browse screenshot</span>
              </BaseText>
            </label>
          )}
          <input
            id={id}
            type="file"
            accept={accept}
            disabled={disabled}
            className="sr-only"
            onChange={(event) => {
              const chosen = event.target.files?.[0];
              if (chosen) onSelect(chosen);
              event.target.value = "";
            }}
          />
        </div>
        {error ? (
          <BaseText variant="caption" tone="error">
            {error}
          </BaseText>
        ) : null}
      </Stack>
    </Stack>
  );
}
