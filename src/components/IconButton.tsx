import type { MouseEventHandler } from "react";
import { Icon, type IconName } from "../icons";
import { cx } from "../lib/cx";

/** Icon-only actions. Each has a fixed icon and a fixed meaning. */
export const ICON_ACTIONS = ["edit", "delete", "dismiss", "navigate-back", "copy-key", "open"] as const;
export type IconAction = (typeof ICON_ACTIONS)[number];

const ICON: Record<IconAction, IconName> = {
  edit: "pencil",
  delete: "trash",
  dismiss: "close",
  "navigate-back": "arrowLeft",
  "copy-key": "link",
  open: "externalLink",
};

export interface IconButtonProps {
  action: IconAction;
  /** Accessible name. Required because there is no visible text. */
  label: string;
  /** Use "onAction" when the button sits on a blue surface, such as a table header. */
  surface?: "default" | "onAction";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function IconButton({ action, label, surface = "default", disabled, onClick }: IconButtonProps) {
  const tone =
    surface === "onAction"
      ? "text-on-action"
      : action === "delete"
        ? "text-feedback-error"
        : "text-text-secondary";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "inline-flex size-icon shrink-0 cursor-pointer items-center justify-center rounded-badge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action disabled:cursor-not-allowed disabled:opacity-50",
        tone,
      )}
    >
      <Icon name={ICON[action]} />
    </button>
  );
}
