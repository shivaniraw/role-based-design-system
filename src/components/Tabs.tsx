import { useRef, type KeyboardEvent } from "react";
import { cx } from "../lib/cx";
import { BaseBadge } from "./badges/BaseBadge";

export interface TabItem {
  value: string;
  label: string;
  /** Optional count shown in a badge after the label. */
  count?: number;
}

export interface TabsProps {
  /** Tab sets differ per flow, so the tabs are data. */
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

/**
 * Figma: Tabs (32:149) / Tab (32:148). #F1F7FF bar, tabs share the width, `group` apart (Figma 30).
 * Tab: 56 tall, Tab/18 Medium, 10 gap to the badge. Default: #757575 label, 2px #D9D9D9 underline.
 * Selected: #4C86F9 label, 4px #4285F4 underline.
 */
export function Tabs({ items, value, onChange, ariaLabel }: TabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (from: number, step: number) => {
    const next = (from + step + items.length) % items.length;
    const item = items[next];
    if (!item) return;
    onChange(item.value);
    refs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(index, 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(index, -1);
    }
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex gap-group bg-action-tint">
      {items.map((item, index) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cx(
              "flex h-tab-h flex-1 cursor-pointer items-center justify-center gap-attached text-heading font-medium tracking-tab focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-action",
              active
                ? "border-b-4 border-action text-action-strong"
                : "border-b-2 border-border-tab text-text-muted hover:text-text-secondary",
            )}
          >
            {item.label}
            {item.count !== undefined ? (
              <BaseBadge look={active ? "countActive" : "count"}>
                {item.count}
              </BaseBadge>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
