import { BaseText } from "./BaseText";

/** Labels a group of options that has no single field label: "Save on Environment". 14px medium, secondary. */
export function GroupLabel({ children }: { children: string }) {
  return (
    <BaseText variant="label" tone="secondary" as="span">
      {children}
    </BaseText>
  );
}
