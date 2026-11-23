import { useRef, type KeyboardEvent } from "react";
import { cx } from "../lib/cx";
import { Badge } from "./Badge";

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

/** Tabs fill the width, with the `group` gap between them. The active tab is blue. */
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
              "flex h-tab-h flex-1 cursor-pointer items-center justify-center gap-attached border-b-2 text-nav focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-action",
              active
                ? "border-action text-action"
                : "border-border text-text-secondary hover:text-text",
            )}
          >
            {item.label}
            {item.count !== undefined ? (
              <Badge kind="count" tone={active ? "active" : "neutral"}>
                {item.count}
              </Badge>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
