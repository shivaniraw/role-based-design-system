import { cx } from "../lib/cx";

export interface BadgeProps {
  /** "version" is a labelled pill ("Version 1"). "count" is a round number (tab counts). "new" is a green pill for newly created items. */
  kind: "version" | "count" | "new";
  /** Count badges turn blue on the active tab. */
  tone?: "neutral" | "active";
  children: string | number;
}

export function Badge({ kind, tone = "neutral", children }: BadgeProps) {
  if (kind === "version") {
    return (
      <span className="inline-flex h-badge-h items-center rounded-badge bg-neutral-surface px-inset-badge-x text-caption font-medium text-text-secondary">
        {children}
      </span>
    );
  }
  if (kind === "new") {
    return (
      <span className="inline-flex h-badge-h items-center rounded-pill bg-feedback-success px-inset-badge-x text-caption font-medium text-on-action">
        {children}
      </span>
    );
  }
  return (
    <span
      className={cx(
        "inline-flex h-count-badge min-w-count-badge items-center justify-center rounded-pill px-subtext text-caption font-medium text-on-action",
        tone === "active" ? "bg-action" : "bg-text-muted",
      )}
    >
      {children}
    </span>
  );
}
