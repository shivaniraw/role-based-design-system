import { BaseIconButton, type IconButtonStateProps } from "./BaseIconButton";

/** Pencil icon. Opens the details of the thing next to it for editing. */
export function EditButton(props: IconButtonStateProps) {
  return <BaseIconButton icon="pencil" tone="default" {...props} />;
}
