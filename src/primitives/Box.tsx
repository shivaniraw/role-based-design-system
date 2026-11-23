import { PADDING, type BaseProps, type Inset } from "../tokens";
import { cx } from "../lib/cx";

export interface BoxProps extends BaseProps {
  /** Space inside the box, by role. Never stack an inset with a gap to make one space. */
  inset: Inset;
  grow?: boolean;
}

/** A wrapper whose only job is to hold padding. */
export function Box({ inset, grow, children, ...rest }: BoxProps) {
  return (
    <div className={cx(PADDING[inset], grow && "min-w-zero grow basis-zero")} {...rest}>
      {children}
    </div>
  );
}

/** The page frame: padding on all sides, filling the space next to the navigation. */
export function Page({ children, ...rest }: BaseProps) {
  return (
    <main className="flex grow flex-col p-inset-page" {...rest}>
      {children}
    </main>
  );
}
