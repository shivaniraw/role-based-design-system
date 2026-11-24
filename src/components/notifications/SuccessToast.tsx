import { BaseNotification, type MessageProps } from "./BaseNotification";

/** Confirms an action worked, floating over the page: "Keys Assigned Successfully!". The user closes it. */
export function SuccessToast({ title, children, onDismiss }: MessageProps & { onDismiss: () => void }) {
  return (
    <BaseNotification status="success" placement="floating" title={title} onDismiss={onDismiss}>
      {children}
    </BaseNotification>
  );
}
