import { BaseText } from "./BaseText";

/** Small facts about the page itself: "Published on: 23 Apr 2026, 15:30 IST by Admin". 12px, secondary. */
export function MetaText({ children }: { children: string }) {
  return (
    <BaseText variant="caption" tone="secondary" as="span">
      {children}
    </BaseText>
  );
}
