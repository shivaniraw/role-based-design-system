import { BaseIconButton, type IconButtonStateProps } from "./BaseIconButton";

/** Bin icon, in red. Removes the thing next to it. */
export function DeleteButton(props: IconButtonStateProps) {
  return <BaseIconButton icon="trash" tone="danger" {...props} />;
}
