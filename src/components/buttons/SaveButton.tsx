import { BaseButton, type ButtonStateProps } from "./BaseButton";

/**
 * Keeps the user's changes: "Save", "Preview & Save".
 * Figma: Save Button (32:635).
 */
export function SaveButton({ children = "Save", ...state }: ButtonStateProps & { children?: string }) {
  return (
    <BaseButton look="filled" {...state}>
      {children}
    </BaseButton>
  );
}
