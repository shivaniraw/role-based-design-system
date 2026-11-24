// INTERNAL. Not exported. A new kind of badge is a new role component in this folder.
import type { ReactNode } from "react";
import { cx } from "../../lib/cx";

const LOOK = {
  /** Grey labelled pill, square-ish corners. */
  label: "h-badge-h rounded-badge bg-neutral-surface px-inset-badge-x text-text-secondary",
  /** Green pill with white text. */
  positive: "h-badge-h rounded-pill bg-feedback-success px-inset-badge-x text-on-action",
  /** Small round number, grey. */
  count: "h-count-badge min-w-count-badge justify-center rounded-pill bg-text-muted px-subtext text-on-action",
  /** Small round number, blue (the active tab). */
  countActive: "h-count-badge min-w-count-badge justify-center rounded-pill bg-action px-subtext text-on-action",
} as const;

export function BaseBadge({ look, children }: { look: keyof typeof LOOK; children: ReactNode }) {
  return <span className={cx("inline-flex items-center text-caption font-medium", LOOK[look])}>{children}</span>;
}
