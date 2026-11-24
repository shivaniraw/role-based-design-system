// INTERNAL. Not exported. Screens use ErrorBanner, SuccessBanner, ErrorToast or SuccessToast.
// A new kind of message is a new role component in this folder.
import { Icon } from "../../icons";
import { cx } from "../../lib/cx";
import { Stack } from "../../primitives/Stack";
import { BaseText } from "../../primitives/text/BaseText";
import { CloseButton } from "../icon-buttons/CloseButton";

export interface MessageProps {
  title: string;
  /** Detail line under the title. */
  children?: string;
}

interface BaseNotificationProps extends MessageProps {
  status: "error" | "success";
  /** "inline" sits in the page flow (validation errors). "floating" appears over the page (success toasts). */
  placement: "inline" | "floating";
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

export function BaseNotification({ status, placement, title, children, onDismiss }: BaseNotificationProps) {
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
          <BaseText variant="body" weight="medium" tone={tone}>
            {title}
          </BaseText>
          {children ? (
            <BaseText variant="caption" tone="secondary">
              {children}
            </BaseText>
          ) : null}
        </Stack>
      </div>
      {onDismiss ? <CloseButton label="Dismiss" onClick={onDismiss} /> : null}
    </div>
  );
}
