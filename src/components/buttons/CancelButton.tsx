import { BaseButton, type ButtonStateProps } from "./BaseButton";

/**
 * Leaves without saving. Always reads "Cancel".
 * Figma: Cancel Button (44:653).
 */
export function CancelButton(state: ButtonStateProps) {
  return (
    <BaseButton look="outline" {...state}>
      Cancel
    </BaseButton>
  );
}
