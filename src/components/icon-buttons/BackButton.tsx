import { BaseIconButton, type IconButtonStateProps } from "./BaseIconButton";

/** Left arrow. Returns to the previous page. */
export function BackButton(props: IconButtonStateProps) {
  return <BaseIconButton icon="arrowLeft" tone="default" {...props} />;
}
