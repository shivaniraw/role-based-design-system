import { BaseIconButton, type IconButtonStateProps } from "./BaseIconButton";

/** Cross icon. Closes a modal or dismisses a message. */
export function CloseButton(props: IconButtonStateProps) {
  return <BaseIconButton icon="close" tone="default" {...props} />;
}
