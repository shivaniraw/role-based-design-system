import { cx } from "../lib/cx";
import { BaseText } from "../primitives/text/BaseText";

type LabelProps =
  | { label: string; ariaLabel?: never }
  | { label?: never; ariaLabel: string };

export type CheckboxProps = LabelProps & {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  /** Label color on a blue surface, such as a table header. */
  onAction?: boolean;
};

const BOX =
  "size-checkbox shrink-0 cursor-pointer accent-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed";

/** A checkbox with its label. Checkbox to label is the `iconLabel` relation. */
export function Checkbox({ label, ariaLabel, checked, defaultChecked, onChange, disabled, name, onAction }: CheckboxProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-icon-label">
      <input
        type="checkbox"
        name={name}
        className={BOX}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      {label ? (
        <BaseText variant="body" tone={onAction ? "onAction" : "default"}>
          {label}
        </BaseText>
      ) : null}
    </label>
  );
}

export type OptionBoxProps = {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
};

/**
 * A checkbox inside a bordered box, for choosing environments (Prod, Pre-Prod).
 * Holds the option-card inset exception (6 across, 8 down), so screens never set it.
 */
export function OptionBox({ label, checked, defaultChecked, onChange, disabled, name }: OptionBoxProps) {
  return (
    <label
      className={cx(
        "flex h-field-h w-full items-center gap-icon-label rounded-field border px-option-card-x py-option-card-y",
        disabled
          ? "cursor-not-allowed border-transparent bg-neutral-surface"
          : "cursor-pointer border-border bg-surface-card has-checked:border-action",
      )}
    >
      <span className="flex size-icon shrink-0 items-center justify-center">
        <input
          type="checkbox"
          name={name}
          className={BOX}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
      </span>
      <span className="whitespace-nowrap">
        <BaseText variant="body" tone={disabled ? "muted" : "default"}>
          {label}
        </BaseText>
      </span>
    </label>
  );
}
