import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  /** Pinned to the bottom of the card, at least a `region` gap below the content. */
  footer?: ReactNode;
}

/**
 * The page card. Holds the card inset exception (26 left/right) and the panel inset (40 top/bottom),
 * so screens never set them. Content and footer are separated by the `region` gap.
 */
export function Card({ children, footer }: CardProps) {
  return (
    <section className="flex grow flex-col gap-region rounded-panel bg-surface-card px-card-x py-inset-panel shadow-card">
      <div className="grow">{children}</div>
      {footer}
    </section>
  );
}
