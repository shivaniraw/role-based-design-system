import { BaseButton, type ButtonStateProps } from "./BaseButton";

/** Publishes the current changes to the test app, so they can be checked before going live. */
export function PublishToTestButton(state: ButtonStateProps) {
  return (
    <BaseButton look="filled" {...state}>
      Publish to Test App
    </BaseButton>
  );
}
