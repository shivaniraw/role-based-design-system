import { BaseNotification, type MessageProps } from "./BaseNotification";

/** A problem the user must fix before going on, shown in the page flow: "Duplicate developer key detected". */
export function ErrorBanner({ title, children }: MessageProps) {
  return (
    <BaseNotification status="error" placement="inline" title={title}>
      {children}
    </BaseNotification>
  );
}
