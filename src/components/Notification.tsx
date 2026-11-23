import { Icon } from "../icons";
import { cx } from "../lib/cx";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import { IconButton } from "./IconButton";

export interface NotificationProps {
  status: "error" | "success";
  /** "inline" sits in the page flow (validation errors). "floating" appears over the page (success toasts). */
  placement: "inline" | "floating";
  title: string;
  /** Detail line under the title. */
  children?: string;
  onDismiss?: () => void;
}

const LOOK = {
  inline: {
    error: "border-feedback-error bg-feedback-error-bg",
    success: "border-feedback-success bg-feedback-success-bg",
  },
  floating: {
    error: "border-toast-error-border bg-toast-error",
    success: "border-toast-success-border bg-toast-success",
  },
} as const;

/** One family for both the inline error banner and the floating success toast. */
export function Notification({ status, placement, title, children, onDismiss }: NotificationProps) {
  const tone = status === "error" ? "error" : "success";
  return (
    <div
      role={status === "error" ? "alert" : "status"}
      className={cx(
        "flex items-start gap-icon-label rounded-field border px-inset-container-x py-inset-container-y",
        LOOK[placement][status],
        placement === "floating" ? "fixed top-region right-region z-50 w-toast-w shadow-popover" : "w-full",
      )}
    >
      <span className={status === "error" ? "text-feedback-error" : "text-feedback-success"}>
        <Icon name={status === "error" ? "alertCircle" : "checkCircle"} />
      </span>
      <div className="min-w-zero grow">
        <Stack relation="subtext">
          <Text variant="body" weight="medium" tone={tone}>
            {title}
          </Text>
          {children ? (
            <Text variant="caption" tone="secondary">
              {children}
            </Text>
          ) : null}
        </Stack>
      </div>
      {onDismiss ? <IconButton action="dismiss" label="Dismiss" onClick={onDismiss} /> : null}
    </div>
  );
}
