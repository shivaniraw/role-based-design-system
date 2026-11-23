import type { ReactNode } from "react";
import { ALIGN, GAP, type Align, type BaseProps, type Relation } from "../tokens";
import { cx } from "../lib/cx";

export interface SplitProps extends Omit<BaseProps, "children"> {
  start?: ReactNode;
  end?: ReactNode;
  /**
   * The smallest gap allowed between start and end. The two sides are pushed to opposite
   * edges (space-between); this gap only applies when the row gets tight.
   * Example: page title and action buttons use "group"; table and footer buttons use "region".
   */
  minRelation?: Relation;
  align?: Align;
}

/** Two things pushed to opposite edges, with a minimum gap between them. */
export function Split({ start, end, minRelation = "related", align = "center", ...rest }: SplitProps) {
  return (
    <div className={cx("flex flex-row justify-between", GAP[minRelation], ALIGN[align])} {...rest}>
      <div className="min-w-zero">{start}</div>
      <div className="shrink-0">{end}</div>
    </div>
  );
}
