import { BaseIconButton, type IconButtonStateProps } from "./BaseIconButton";

/** Open-in-new icon. Opens the details of a table row. (Assumed meaning; confirm with design.) */
export function OpenButton(props: IconButtonStateProps) {
  return <BaseIconButton icon="externalLink" tone="default" {...props} />;
}
