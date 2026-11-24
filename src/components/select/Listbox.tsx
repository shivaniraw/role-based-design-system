// INTERNAL. The dropdown behind SelectField, DropdownCell and the nav's language selector.
// It replaces the browser's native <select> menu, which can't be styled and looked different
// on every OS. The menu renders in a portal, so table and modal scrolling can't clip it.
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../../icons";
import { cx } from "../../lib/cx";

export interface SelectOption {
  value: string;
  label: string;
}

/** Trigger looks. Each matches one Figma component. */
const TRIGGER = {
  /** Figma: Select Field Input. 40 tall, #E0E0E0 border, Input shadow, 16 Regular. */
  field:
    "h-field-h rounded-field border border-border bg-surface-card px-inset-field-x shadow-input text-input",
  /** Figma: Table Cell / Dropdown. 40 tall, #BDBDBD border, Dropdown shadow, 16 Regular #424242. */
  cell: "h-field-h rounded-field border border-border-control bg-surface-card px-inset-field-x shadow-dropdown text-input",
  /** Figma: App Selector. 54 tall pill, #BEBEBE border, Selector shadow, 20 Medium #7C7C7C. */
  selector:
    "h-selector-h rounded-pill border border-border-dashed bg-surface-card pl-inset-control-x pr-inset-container-x shadow-selector text-title font-medium",
} as const;

const VALUE_TONE = {
  field: "text-text",
  cell: "text-text-secondary",
  selector: "text-text-subtle",
} as const;

export interface ListboxProps {
  look: keyof typeof TRIGGER;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** id of the trigger, so a <label htmlFor> can name it. */
  id?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  invalid?: boolean;
  disabled?: boolean;
  /** Status border (prompt, error) from the field, if any. */
  borderClass?: string;
  name?: string;
}

interface MenuPosition {
  top: number;
  left: number;
  width: number;
  above: boolean;
}

const GAP = 8; // the `attached` relation: trigger and its menu are parts of one element

export function Listbox({
  look,
  options,
  value,
  onChange,
  placeholder,
  id,
  ariaLabel,
  ariaDescribedBy,
  invalid,
  disabled,
  borderClass,
  name,
}: ListboxProps) {
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState<MenuPosition | null>(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options.at(selectedIndex) : undefined;

  const place = useCallback(() => {
    const rect = trigger.current?.getBoundingClientRect();
    if (!rect) return;
    const menuHeight = menu.current?.offsetHeight ?? 0;
    const above = rect.bottom + GAP + menuHeight > window.innerHeight && rect.top - GAP - menuHeight > 0;
    setPosition({
      top: above ? rect.top - GAP - menuHeight : rect.bottom + GAP,
      left: rect.left,
      width: rect.width,
      above,
    });
  }, []);

  const openMenu = () => {
    if (disabled) return;
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const choose = (index: number) => {
    const option = options.at(index);
    if (option) onChange(option.value);
    setOpen(false);
    trigger.current?.focus();
  };

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        break;
      case "Escape":
        // Close only the menu, not a modal around it.
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const optionId = (index: number) => `${menuId}-option-${index}`;

  return (
    <>
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={cx(
          "flex w-full cursor-pointer items-center gap-attached text-left focus-visible:outline-2 focus-visible:outline-action disabled:cursor-not-allowed disabled:bg-neutral-surface",
          TRIGGER[look],
          borderClass,
          open && "border-action",
        )}
      >
        <span className={cx("min-w-zero grow truncate", selected ? VALUE_TONE[look] : "text-text-placeholder")}>
          {selected?.label ?? placeholder ?? ""}
        </span>
        <span className="text-text-muted">
          <Icon name="chevronDown" size={look === "selector" ? "md" : "field"} />
        </span>
      </button>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      {open
        ? createPortal(
            <ul
              ref={menu}
              id={menuId}
              role="listbox"
              aria-label={ariaLabel}
              style={{
                top: position?.top ?? 0,
                left: position?.left ?? 0,
                width: position?.width,
                visibility: position ? "visible" : "hidden",
              }}
              className="ds-scroll fixed z-50 max-h-menu-max-h overflow-y-auto rounded-field border border-border bg-surface-card py-subtext shadow-popover"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    id={optionId(index)}
                    role="option"
                    aria-selected={isSelected}
                    onPointerEnter={() => setActive(index)}
                    onClick={() => choose(index)}
                    className={cx(
                      "flex h-field-h cursor-pointer items-center text-input",
                      look === "selector" ? "px-inset-control-x" : "px-inset-field-x",
                      isSelected ? "font-medium text-action" : "text-text-secondary",
                      index === active ? "bg-action-subtle" : isSelected && "bg-action-tint",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                  </li>
                );
              })}
            </ul>,
            document.body,
          )
        : null}
    </>
  );
}
