import { BaseBadge } from "./BaseBadge";

/** Marks an item created since the user last looked. Always reads "New". */
export function NewBadge() {
  return <BaseBadge look="positive">New</BaseBadge>;
}
