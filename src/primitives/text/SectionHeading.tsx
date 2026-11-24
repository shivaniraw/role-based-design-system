import { BaseText } from "./BaseText";

/** Names a section inside a page or card. 18px medium, h2. */
export function SectionHeading({ children }: { children: string }) {
  return (
    <BaseText variant="heading" tone="default" as="h2">
      {children}
    </BaseText>
  );
}
