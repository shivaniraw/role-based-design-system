import type { FormEvent } from "react";
import { ALIGN, GAP, type Align, type BaseProps, type Relation } from "../tokens";
import { cx } from "../lib/cx";

export interface StackProps extends BaseProps {
  /** The relationship between the stacked items. Picks the gap. */
  relation: Relation;
  align?: Align;
  grow?: boolean;
  as?: "div" | "section" | "nav" | "header" | "footer" | "main" | "aside";
}

/** Vertical layout. Items are related to each other in one way, named by `relation`. */
export function Stack({ relation, align = "stretch", grow, as: Tag = "div", children, ...rest }: StackProps) {
  return (
    <Tag className={cx("flex flex-col", GAP[relation], ALIGN[align], grow && "grow")} {...rest}>
      {children}
    </Tag>
  );
}

export interface FormProps extends BaseProps {
  relation: Relation;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

/** A vertical stack that is a <form>. */
export function Form({ relation, onSubmit, children, ...rest }: FormProps) {
  return (
    <form className={cx("flex flex-col", GAP[relation])} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
}
