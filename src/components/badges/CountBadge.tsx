import { BaseBadge } from "./BaseBadge";

/** How many items sit behind a label, such as a tab. */
export function CountBadge({ count }: { count: number }) {
  return <BaseBadge look="count">{count}</BaseBadge>;
}
