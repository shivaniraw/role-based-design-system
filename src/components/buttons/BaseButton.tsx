// INTERNAL. Not exported from the design system, so no screen can use it.
// It holds what every labelled button shares. A new kind of button is a new role
// component in this folder that wraps BaseButton, never a BaseButton in a screen.
import type { MouseEventHandler, ReactNode } from "react";
import { Icon, type IconName } from "../../icons";
import { cx } from "../../lib/cx";

/** Size, shape, type and focus ring shared by every labelled button. */
export const BUTTON_SHAPE =
  "inline-flex h-control-h shrink-0 cursor-pointer items-center justify-center gap-attached rounded-control px-inset-button-x text-button font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed";

/** The three looks. Only role components pick one. */
export const BUTTON_LOOK = {
  filled: "bg-action text-on-action hover:bg-action-hover active:bg-action-pressed disabled:bg-action-disabled",
  outline:
    "border border-action bg-surface-card text-action hover:bg-action-tint active:bg-action-tint disabled:border-action-disabled disabled:bg-surface-card disabled:text-action-disabled",
  neutral:
    "bg-neutral-surface text-text-secondary hover:bg-neutral-surface-hover disabled:bg-neutral-surface disabled:text-neutral-disabled-text",
} as const;

export type ButtonLook = keyof typeof BUTTON_LOOK;

/** States every button supports. Role components pass these through unchanged. */
export interface ButtonStateProps {
  disabled?: boolean;
  /** Shows a spinner and blocks clicks. */
  loading?: boolean;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface BaseButtonProps extends ButtonStateProps {
  look: ButtonLook;
  children: ReactNode;
  iconLeading?: IconName;
  iconTrailing?: IconName;
}

export function BaseButton({ look, children, iconLeading, iconTrailing, disabled, loading, type = "button", onClick }: BaseButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      className={cx(BUTTON_SHAPE, BUTTON_LOOK[look])}
    >
      {loading ? <Icon name="spinner" spin /> : iconLeading ? <Icon name={iconLeading} /> : null}
      {children}
      {iconTrailing && !loading ? <Icon name={iconTrailing} /> : null}
    </button>
  );
}
