// INTERNAL. Not exported. Components use it inside; screens use the role text components
// next to it (PageTitle, MetaText...). A new kind of text is a new role component here.
import type { BaseProps } from "../../tokens";
import { cx } from "../../lib/cx";

export type TextVariant = "title" | "heading" | "nav" | "body" | "label" | "table" | "caption";
export type TextTone = "default" | "secondary" | "muted" | "action" | "error" | "success" | "onAction";
export type TextWeight = "regular" | "medium";

const SIZE: Record<TextVariant, string> = {
  title: "text-title",
  heading: "text-heading",
  nav: "text-nav",
  body: "text-body",
  label: "text-body",
  table: "text-table",
  caption: "text-caption",
};

const DEFAULT_WEIGHT: Record<TextVariant, TextWeight> = {
  title: "medium",
  heading: "medium",
  nav: "regular",
  body: "regular",
  label: "medium",
  table: "regular",
  caption: "regular",
};

const WEIGHT: Record<TextWeight, string> = { regular: "font-regular", medium: "font-medium" };

const TONE: Record<TextTone, string> = {
  default: "text-text",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
  action: "text-action",
  error: "text-feedback-error",
  success: "text-feedback-success",
  onAction: "text-on-action",
};

export interface BaseTextProps extends BaseProps {
  variant: TextVariant;
  tone?: TextTone;
  weight?: TextWeight;
  truncate?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}

export function BaseText({ variant, tone = "default", weight, truncate, as: Tag = "span", children, ...rest }: BaseTextProps) {
  return (
    <Tag className={cx(SIZE[variant], WEIGHT[weight ?? DEFAULT_WEIGHT[variant]], TONE[tone], truncate && "truncate")} {...rest}>
      {children}
    </Tag>
  );
}
