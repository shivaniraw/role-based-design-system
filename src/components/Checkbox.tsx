import type { ChangeEvent } from "react";
import { Icon } from "../icons";
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
  /** On a blue surface, such as a table header: white box and label. */
  onAction?: boolean;
};

interface BoxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  ariaLabel?: string;
}

/**
 * The checkbox glyph. Figma: Icon/Checkbox Off (#5C5C5C outline) and Icon/Checkbox On (blue fill,
 * white tick), 24 frame. The real input stays in the page for keyboard and screen readers.
 */
function CheckGlyph({ checked, defaultChecked, onChange, disabled, name, ariaLabel }: BoxProps) {
  return (
    <span className="relative inline-flex size-icon shrink-0">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.checked)}
        className="peer sr-only"
      />
      <span className="inline-flex rounded-badge text-text-tertiary peer-checked:hidden peer-focus-visible:outline-2 peer-focus-visible:outline-action peer-disabled:text-border-control">
        <Icon name="checkboxOff" />
      </span>
      <span className="hidden rounded-badge text-action peer-checked:inline-flex peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-action peer-disabled:text-text-placeholder">
        <Icon name="checkboxOn" />
      </span>
    </span>
  );
}

/** White native box for blue surfaces (Figma has no on-blue checkbox). */
const ON_ACTION_BOX =
  "size-checkbox shrink-0 cursor-pointer accent-on-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-action";

/** A checkbox with its label. Checkbox to label is the `iconLabel` relation. */
export function Checkbox({ label, ariaLabel, checked, defaultChecked, onChange, disabled, name, onAction }: CheckboxProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-icon-label">
      {onAction ? (
        <input
          type="checkbox"
          name={name}
          className={ON_ACTION_BOX}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-label={ariaLabel}
          onChange={(event) => onChange?.(event.target.checked)}
        />
      ) : (
        <CheckGlyph
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          name={name}
          ariaLabel={ariaLabel}
          onChange={onChange}
        />
      )}
      {label ? (
        <BaseText variant={onAction ? "input" : "label"} weight="medium" tracking="tight" tone={onAction ? "onAction" : "secondary"}>
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
 * Figma: Checkbox Option (5:84). 40 tall, 1px #999999 border, radius 8, 24 checkbox, 12 gap,
 * label Label/14 Medium #424242 at -2%. The border stays grey when checked; the box turns blue.
 * Holds the option-card inset exception (6 across, from the spacing tokens; the Figma component says 12).
 */
export function OptionBox({ label, checked, defaultChecked, onChange, disabled, name }: OptionBoxProps) {
  return (
    <label
      className={cx(
        "flex h-field-h w-full items-center gap-icon-label rounded-field border px-option-card-x",
        disabled
          ? "cursor-not-allowed border-transparent bg-neutral-surface"
          : "cursor-pointer border-border-strong bg-surface-card",
      )}
    >
      <CheckGlyph checked={checked} defaultChecked={defaultChecked} disabled={disabled} name={name} onChange={onChange} />
      <span className="whitespace-nowrap">
        <BaseText variant="label" tracking="tight" tone={disabled ? "muted" : "secondary"}>
          {label}
        </BaseText>
      </span>
    </label>
  );
}
