import { useEffect, useRef, useState } from "react";
import { Icon } from "../../icons";
import { cx } from "../../lib/cx";
import { BUTTON_LOOK, BUTTON_SHAPE } from "./BaseButton";

export interface PublishButtonProps {
  /** The environments the user can publish to, for example ["Prod", "Pre-Prod"]. */
  environments: string[];
  /** Called with the chosen environment. */
  onSelect: (environment: string) => void;
  disabled?: boolean;
}

const LABEL = "Publish";

/**
 * Publishes to an environment the user picks from the menu (Prod, Pre-Prod).
 * Both halves open the menu, because the target must be chosen before anything goes live.
 * Built from the BaseButton shape and filled look, split in two.
 */
export function PublishButton({ environments: options, onSelect, disabled }: PublishButtonProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => setOpen((value) => !value);

  return (
    <div ref={root} className="relative inline-flex">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className={cx(BUTTON_SHAPE, BUTTON_LOOK.filled, "rounded-r-none")}
      >
        {LABEL}
      </button>
      <button
        type="button"
        disabled={disabled}
        aria-label={`${LABEL}: choose environment`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className={cx(
          BUTTON_SHAPE,
          BUTTON_LOOK.filled,
          "rounded-l-none border-l border-action-pressed px-inset-badge-x disabled:border-action-hover",
        )}
      >
        <Icon name="chevronDown" />
      </button>
      {open ? (
        <div className="absolute top-full right-zero z-10 pt-attached">
          <ul role="menu" className="w-menu-w overflow-hidden rounded-field border border-border bg-surface-card shadow-popover">
            {options.map((option) => (
              <li key={option} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onSelect(option);
                  }}
                  className="flex h-field-h w-full cursor-pointer items-center px-inset-field-x text-left text-body text-text hover:bg-action-tint focus-visible:bg-action-tint"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
