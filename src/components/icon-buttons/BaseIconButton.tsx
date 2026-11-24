// INTERNAL. Not exported, so no screen can use it. A new icon-only button is a new role
// component in this folder that wraps BaseIconButton with a fixed icon and meaning.
import type { MouseEventHandler } from "react";
import { Icon, type IconName } from "../../icons";
import { cx } from "../../lib/cx";

const TONE = {
  default: "text-text-secondary",
  danger: "text-feedback-error",
  /** On a blue surface, such as a table header. */
  onAction: "text-on-action",
} as const;

export interface IconButtonStateProps {
  /** Accessible name. Required because there is no visible text. */
  label: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function BaseIconButton({
  icon,
  tone,
  label,
  disabled,
  onClick,
}: IconButtonStateProps & { icon: IconName; tone: keyof typeof TONE }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "inline-flex size-icon shrink-0 cursor-pointer items-center justify-center rounded-badge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed disabled:opacity-50",
        TONE[tone],
      )}
    >
      <Icon name={icon} />
    </button>
  );
}
