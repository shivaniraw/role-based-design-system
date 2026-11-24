import { BaseText } from "./BaseText";

/** The one title at the top of a page: "Select the page or module you want to translate". 20px medium, h1. */
export function PageTitle({ children }: { children: string }) {
  return (
    <BaseText variant="title" tone="default" as="h1">
      {children}
    </BaseText>
  );
}
