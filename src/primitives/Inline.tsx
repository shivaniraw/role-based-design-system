import { ALIGN, GAP, type Align, type BaseProps, type Relation } from "../tokens";
import { cx } from "../lib/cx";

export interface InlineProps extends BaseProps {
  /** The relationship between the items in the row. Picks the gap. */
  relation: Relation;
  align?: Align;
  grow?: boolean;
  wrap?: boolean;
}

/** Horizontal layout. The same relationship gets the same gap as in a Stack. */
export function Inline({ relation, align = "center", grow, wrap, children, ...rest }: InlineProps) {
  return (
    <div className={cx("flex flex-row", GAP[relation], ALIGN[align], grow && "grow", wrap && "flex-wrap")} {...rest}>
      {children}
    </div>
  );
}
