import { useId, useState, type DragEvent } from "react";
import { Icon } from "../icons";
import { cx } from "../lib/cx";
import { Stack } from "../primitives/Stack";
import { BaseText } from "../primitives/text/BaseText";
import { DashedOutline } from "./DashedOutline";
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

/**
 * Figma: Image Upload (5:65). 140 tall, dashed 1px #BEBEBE (dash 4, gap 2), radius 14, 36 upload icon #757575, 12 gap,
 * Body/14 #5C5C5C with underlined "Browse screenshot". Drag-over, filled and error looks are derived.
 */
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
    <Stack relation="subtext">
      <label htmlFor={id} className="text-body font-medium text-text-muted">
        {label}
      </label>
      <Stack relation="subtext">
        <div
          className={cx("relative flex h-upload-h items-center justify-center rounded-upload", dragging && !error ? "bg-action-tint" : "bg-surface-card")}
        >
          <DashedOutline radius="upload" tone={error ? "error" : dragging ? "active" : "default"} />
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
              className="flex size-full cursor-pointer flex-col items-center justify-center gap-related rounded-upload text-text-muted has-focus-visible:outline-2 has-focus-visible:outline-action"
            >
              <Icon name="upload" size="lg" />
              <BaseText variant="body" tone="tertiary">
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
