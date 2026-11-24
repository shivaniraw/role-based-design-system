import { BaseNotification, type MessageProps } from "./BaseNotification";

/** A success that stays in the page flow, next to what it is about. */
export function SuccessBanner({ title, children }: MessageProps) {
  return (
    <BaseNotification status="success" placement="inline" title={title}>
      {children}
    </BaseNotification>
  );
}
