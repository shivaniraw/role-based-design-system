import { BaseButton, type ButtonStateProps } from "./BaseButton";

/**
 * Starts creating something new: "Add New Word", "Add Dev_key".
 * Figma: Add Button (32:627).
 */
export function AddButton({ children, ...state }: ButtonStateProps & { children: string }) {
  return (
    <BaseButton look="filled" {...state}>
      {children}
    </BaseButton>
  );
}
