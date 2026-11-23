/** Joins class names, skipping falsy values. Used only inside design-system components. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
