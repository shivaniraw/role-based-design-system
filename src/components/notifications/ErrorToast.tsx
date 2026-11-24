import { BaseNotification, type MessageProps } from "./BaseNotification";

/** A problem reported after an action, floating over the page. The user closes it. */
export function ErrorToast({ title, children, onDismiss }: MessageProps & { onDismiss: () => void }) {
  return (
    <BaseNotification status="error" placement="floating" title={title} onDismiss={onDismiss}>
      {children}
    </BaseNotification>
  );
}
