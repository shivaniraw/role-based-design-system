import { BaseIconButton, type IconButtonStateProps } from "./BaseIconButton";

/** Link icon. Copies a developer key to the clipboard. (Assumed meaning; confirm with design.) */
export function CopyKeyButton(props: IconButtonStateProps) {
  return <BaseIconButton icon="link" tone="default" {...props} />;
}
