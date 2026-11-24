import { useId, useState, type ReactNode } from "react";
import { Listbox, type SelectOption } from "./select/Listbox";
import { Icon, type IconName } from "../icons";
import { cx } from "../lib/cx";
import { Stack } from "../primitives/Stack";
import { BaseText } from "../primitives/text/BaseText";

/**
 * default  - nothing to say
 * prompt   - waiting for input (blue border, used for empty required table cells)
 * valid    - passed validation (green check)
 * error    - failed validation (red border and icon, message shown)
 * disabled / readonly - not editable
 */
export type FieldStatus = "default" | "prompt" | "valid" | "error" | "disabled" | "readonly";

const BORDER: Record<FieldStatus, string> = {
  default: "border-border",
  prompt: "border-action",
  valid: "border-border",
  error: "border-feedback-error",
  disabled: "border-border bg-neutral-surface",
  readonly: "border-transparent bg-neutral-surface shadow-dropdown",
};

type NameProps =
  | { label: string; ariaLabel?: string }
  | { label?: undefined; ariaLabel: string };

interface FieldCommon {
  required?: boolean;
  /** Helper or error text under the field. */
  message?: string;
  status?: FieldStatus;
  name?: string;
}

function FieldShell({
  id,
  label,
  required,
  message,
  status = "default",
  children,
}: {
  id: string;
  label?: string;
  required?: boolean;
  message?: string;
  status?: FieldStatus;
  children: ReactNode;
}) {
  const control = (
    <Stack relation="subtext">
      {children}
      {message ? (
        <BaseText variant="caption" tone={status === "error" ? "error" : "muted"} id={`${id}-message`}>
          {message}
        </BaseText>
      ) : null}
    </Stack>
  );
  if (!label) return control;
  return (
    <Stack relation="subtext">
      <label htmlFor={id} className="text-body font-medium text-text-muted">
        {label}
        {required ? <span className="text-required">*</span> : null}
      </label>
      {control}
    </Stack>
  );
}

/** The bordered box that holds the input and its icons. */
function FieldBox({
  status,
  iconLeading,
  iconTrailing,
  children,
}: {
  status: FieldStatus;
  iconLeading?: IconName;
  iconTrailing?: IconName;
  children: ReactNode;
}) {
  const statusIcon: IconName | undefined =
    status === "valid" ? "checkCircle" : status === "error" ? "xCircle" : undefined;
  const statusTone = status === "valid" ? "text-feedback-success" : "text-feedback-error";
  return (
    <div
      className={cx(
        "flex h-field-h w-full items-center gap-attached rounded-field border bg-surface-card px-inset-field-x shadow-input focus-within:outline-2 focus-within:outline-action",
        BORDER[status],
      )}
    >
      {iconLeading ? (
        <span className="text-text-muted">
          <Icon name={iconLeading} />
        </span>
      ) : null}
      {children}
      {statusIcon ? (
        <span className={statusTone}>
          <Icon name={statusIcon} />
        </span>
      ) : iconTrailing ? (
        <span className="text-text-muted">
          <Icon name={iconTrailing} />
        </span>
      ) : null}
    </div>
  );
}

/** Figma: Input/16 Regular, #333333 filled, #999999 placeholder. */
const INPUT =
  "h-full min-w-zero grow basis-zero bg-transparent text-input text-text outline-none placeholder:text-text-placeholder read-only:text-text-muted disabled:text-neutral-disabled-text";

export type TextFieldProps = NameProps &
  FieldCommon & {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    type?: "text" | "email" | "search";
    iconLeading?: IconName;
    iconTrailing?: IconName;
    onChange?: (value: string) => void;
  };

export function TextField({
  label,
  ariaLabel,
  required,
  message,
  status = "default",
  name,
  value,
  defaultValue,
  placeholder,
  type = "text",
  iconLeading,
  iconTrailing,
  onChange,
}: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} message={message} status={status}>
      <FieldBox status={status} iconLeading={iconLeading} iconTrailing={iconTrailing}>
        <input
          id={id}
          name={name}
          type={type}
          className={INPUT}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={status === "disabled"}
          readOnly={status === "readonly"}
          required={required}
          aria-label={label ? undefined : ariaLabel}
          aria-invalid={status === "error" || undefined}
          aria-describedby={message ? `${id}-message` : undefined}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </FieldBox>
    </FieldShell>
  );
}

export type { SelectOption };

export type SelectFieldProps = NameProps &
  FieldCommon & {
    options: SelectOption[];
    /** Shown when nothing is chosen. */
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
  };

export function SelectField({
  label,
  ariaLabel,
  required,
  message,
  status = "default",
  name,
  options,
  placeholder,
  value,
  defaultValue,
  onChange,
}: SelectFieldProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultValue ?? "");
  const current = value ?? inner;
  return (
    <FieldShell id={id} label={label} required={required} message={message} status={status}>
      <Listbox
        look="field"
        id={id}
        name={name}
        options={options}
        value={current}
        placeholder={placeholder}
        ariaLabel={label ? undefined : ariaLabel}
        ariaDescribedBy={message ? `${id}-message` : undefined}
        invalid={status === "error"}
        disabled={status === "disabled" || status === "readonly"}
        borderClass={BORDER[status]}
        onChange={(next) => {
          setInner(next);
          onChange?.(next);
        }}
      />
    </FieldShell>
  );
}

export type TextAreaProps = NameProps &
  FieldCommon & {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
  };

export function TextArea({
  label,
  ariaLabel,
  required,
  message,
  status = "default",
  name,
  value,
  defaultValue,
  placeholder,
  onChange,
}: TextAreaProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} message={message} status={status}>
      <textarea
        id={id}
        name={name}
        dir="auto"
        className={cx(
          "min-h-textarea-h w-full resize-y rounded-field border bg-surface-card px-inset-field-x py-inset-control-y text-input text-text shadow-input outline-none placeholder:text-text-placeholder focus-visible:outline-2 focus-visible:outline-action disabled:text-neutral-disabled-text",
          BORDER[status],
        )}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={status === "disabled"}
        readOnly={status === "readonly"}
        required={required}
        aria-label={label ? undefined : ariaLabel}
        aria-invalid={status === "error" || undefined}
        aria-describedby={message ? `${id}-message` : undefined}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </FieldShell>
  );
}
