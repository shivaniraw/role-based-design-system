import type { MouseEventHandler } from "react";
import { Icon, type IconName } from "../icons";
import { cx } from "../lib/cx";

/**
 * CTA roles are named by the ACTION the click performs, not by how the button looks.
 * The action decides the appearance.
 */
export const BUTTON_ACTIONS = ["create", "save", "publish", "cancel", "switch"] as const;
export type ButtonAction = (typeof BUTTON_ACTIONS)[number];

type Appearance = "filled" | "outline" | "neutral";

const APPEARANCE: Record<ButtonAction, Appearance> = {
  create: "filled", // opens a creation flow: Add Dev_key, Add New Word
  save: "filled", // commits changes: Save, Save as Pending_Dev_key
  publish: "filled", // releases to an environment (see SplitButton)
  cancel: "outline", // abandons without saving
  switch: "neutral", // changes a context: Language
};

export const BUTTON_BASE =
  "inline-flex h-control-h shrink-0 cursor-pointer items-center justify-center gap-attached rounded-control px-inset-button-x text-button font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed";

export const BUTTON_LOOK: Record<Appearance, string> = {
  filled: "bg-action text-on-action hover:bg-action-hover active:bg-action-pressed disabled:bg-action-disabled",
  outline:
    "border border-action bg-surface-card text-action hover:bg-action-tint active:bg-action-tint disabled:border-action-disabled disabled:bg-surface-card disabled:text-action-disabled",
  neutral:
    "bg-neutral-surface text-text-secondary hover:bg-neutral-surface-hover disabled:bg-neutral-surface disabled:text-neutral-disabled-text",
};

export function appearanceOf(action: ButtonAction): Appearance {
  return APPEARANCE[action];
}

export interface ButtonProps {
  action: ButtonAction;
  children: string;
  iconLeading?: IconName;
  iconTrailing?: IconName;
  disabled?: boolean;
  /** Shows a spinner and blocks clicks. */
  loading?: boolean;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "data-testid"?: string;
}

export function Button({
  action,
  children,
  iconLeading,
  iconTrailing,
  disabled,
  loading,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const blocked = disabled || loading;
  return (
    <button
      type={type}
      disabled={blocked}
      aria-busy={loading || undefined}
      onClick={onClick}
      className={cx(BUTTON_BASE, BUTTON_LOOK[APPEARANCE[action]])}
      {...rest}
    >
      {loading ? <Icon name="spinner" spin /> : iconLeading ? <Icon name={iconLeading} /> : null}
      {children}
      {iconTrailing && !loading ? <Icon name={iconTrailing} /> : null}
    </button>
  );
}
