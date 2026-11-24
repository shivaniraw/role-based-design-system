import { BaseButton, type ButtonStateProps } from "./BaseButton";

/**
 * Saves into a named state other than the current one: "Save as Pending_Dev_key".
 * Figma: Save As Button (44:649).
 */
export function SaveAsButton({ target, ...state }: ButtonStateProps & { target: string }) {
  return (
    <BaseButton look="filled" {...state}>
      {`Save as ${target}`}
    </BaseButton>
  );
}
