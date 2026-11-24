// INTERNAL. Not exported. Components use it inside; screens use the role text components
// next to it (PageTitle, MetaText...). A new kind of text is a new role component here.
import type { BaseProps } from "../../tokens";
import { cx } from "../../lib/cx";

export type TextVariant = "large" | "title" | "heading" | "input" | "body" | "label" | "table" | "caption";
export type TextTone = "default" | "secondary" | "tertiary" | "muted" | "subtle" | "placeholder" | "action" | "error" | "success" | "onAction";
export type TextWeight = "regular" | "medium";

const SIZE: Record<TextVariant, string> = {
  large: "text-large",
  input: "text-input",
  title: "text-title",
  heading: "text-heading",
  body: "text-body",
  label: "text-body",
  table: "text-table",
  caption: "text-caption",
};

const DEFAULT_WEIGHT: Record<TextVariant, TextWeight> = {
  large: "regular",
  input: "regular",
  title: "medium",
  heading: "medium",
  body: "regular",
  label: "medium",
  table: "regular",
  caption: "regular",
};

const WEIGHT: Record<TextWeight, string> = { regular: "font-regular", medium: "font-medium" };

const TONE: Record<TextTone, string> = {
  default: "text-text",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
  muted: "text-text-muted",
  subtle: "text-text-subtle",
  placeholder: "text-text-placeholder",
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
  /** Figma letter spacing: nav items and brand 0.3px, tabs 0.1px, table header and checkbox labels -2%. */
  tracking?: "nav" | "tab" | "tight";
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}

const TRACKING = { nav: "tracking-nav", tab: "tracking-tab", tight: "tracking-tight" } as const;

export function BaseText({ variant, tone = "default", weight, truncate, tracking, as: Tag = "span", children, ...rest }: BaseTextProps) {
  return (
    <Tag className={cx(SIZE[variant], WEIGHT[weight ?? DEFAULT_WEIGHT[variant]], TONE[tone], truncate && "truncate", tracking && TRACKING[tracking])} {...rest}>
      {children}
    </Tag>
  );
}
