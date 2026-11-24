import { BaseButton, type ButtonStateProps } from "./BaseButton";

/**
 * Switches the language the user is working in. Shows the current language with a globe.
 * Figma: Language Button (32:618).
 */
export function LanguageButton({ language, ...state }: ButtonStateProps & { language: string }) {
  return (
    <BaseButton look="neutral" iconLeading="globe" {...state}>
      {language}
    </BaseButton>
  );
}
