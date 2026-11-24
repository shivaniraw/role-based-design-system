import { BaseText } from "./BaseText";

/** Running text: sentences and short descriptions. 14px regular. */
export function BodyText({ children }: { children: string }) {
  return (
    <BaseText variant="body" tone="default" as="p">
      {children}
    </BaseText>
  );
}
