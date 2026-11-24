// INTERNAL. Not exported. Draws the design system's dashed stroke (Figma: 1px, dash 4, gap 2)
// over the box it sits in. The box must be `relative`. CSS `border-dashed` can't set the dash
// pattern, so the stroke is an SVG rect that reads `--dash-border-dashed` and the box's radius token.
import type { CSSProperties } from "react";
import { cx } from "../lib/cx";

const TONE = {
  default: "text-border-dashed",
  active: "text-action",
  error: "text-feedback-error",
} as const;

/** Radius tokens a dashed box can use. */
const RADIUS = {
  upload: "var(--radius-upload)",
} as const;

export function DashedOutline({ tone = "default", radius }: { tone?: keyof typeof TONE; radius: keyof typeof RADIUS }) {
  // The stroke is centered on the path, so the rect is inset by half the stroke (hairline / 2).
  const rect = {
    width: "calc(100% - var(--spacing-hairline))",
    height: "calc(100% - var(--spacing-hairline))",
    rx: `calc(${RADIUS[radius]} - var(--spacing-hairline) / 2)`,
    strokeDasharray: "var(--dash-border-dashed)",
  } as CSSProperties;
  return (
    <svg aria-hidden="true" className={cx("pointer-events-none absolute inset-zero size-full", TONE[tone])}>
      <rect x="0.5" y="0.5" fill="none" stroke="currentColor" strokeWidth="1" style={rect} />
    </svg>
  );
}
