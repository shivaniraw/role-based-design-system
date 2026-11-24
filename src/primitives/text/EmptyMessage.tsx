import { BaseText } from "./BaseText";

/** Says a list or tab has nothing in it yet: "No pending translations." 14px, muted. */
export function EmptyMessage({ children }: { children: string }) {
  return (
    <BaseText variant="body" tone="muted" as="p">
      {children}
    </BaseText>
  );
}
