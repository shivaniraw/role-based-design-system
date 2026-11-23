import { useEffect, useRef, useState } from "react";
import { Icon } from "../icons";
import { cx } from "../lib/cx";
import { BUTTON_BASE, BUTTON_LOOK } from "./Button";

export interface SplitButtonProps {
  action: "publish";
  /** Button label, for example "Publish". */
  children: string;
  /** The environments the user can publish to, for example ["Prod", "Pre-Prod"]. */
  options: string[];
  /** Called with the chosen environment. */
  onSelect: (option: string) => void;
  disabled?: boolean;
}

/**
 * Publish control. Both halves open the environment menu, because the user must choose
 * the target before anything is published. (Assumption; confirm with design.)
 */
export function SplitButton({ children, options, onSelect, disabled }: SplitButtonProps) {
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
        className={cx(BUTTON_BASE, BUTTON_LOOK.filled, "rounded-r-none")}
      >
        {children}
      </button>
      <button
        type="button"
        disabled={disabled}
        aria-label={`${children}: choose environment`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className={cx(
          BUTTON_BASE,
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
