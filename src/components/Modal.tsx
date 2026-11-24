import { useEffect, useId, useRef, type ReactNode } from "react";
import { Split } from "../primitives/Split";
import { BaseText } from "../primitives/text/BaseText";
import { CloseButton } from "./icon-buttons/CloseButton";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), *[tabindex]:not([tabindex="-1"])';

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Use <ModalFooter>. */
  footer: ReactNode;
  /** Off by default: clicking outside a data-entry modal should not throw away typed input. */
  dismissOnOverlay?: boolean;
}

/**
 * Modal dialog (Figma: Modal / Add Translation, 704 form + 40 panel inset = 784 wide).
 * Header, form and footer are `region` apart. Header and footer stay put; only the form scrolls
 * when the window is short, so the rounded corners are never cut by a scrollbar.
 * Escape closes; focus is trapped and restored.
 */
export function Modal({ title, onClose, children, footer, dismissOnOverlay = false }: ModalProps) {
  const titleId = useId();
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the dialog itself: screen readers announce its title, and no control shows a focus ring on open.
    dialog.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog.current) return;
      const nodes = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (!firstNode || !lastNode) return;
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-zero z-40 flex items-center justify-center bg-overlay p-inset-page"
      onMouseDown={(event) => {
        if (dismissOnOverlay && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-full w-modal-w max-w-full flex-col gap-region overflow-hidden rounded-panel bg-surface-card py-inset-panel shadow-popover outline-none"
      >
        <div className="shrink-0 px-inset-panel">
          <Split
            start={
              <BaseText variant="title" as="h2" id={titleId}>
                {title}
              </BaseText>
            }
            end={<CloseButton label="Close" onClick={onClose} />}
          />
        </div>
        <div className="ds-scroll min-h-zero grow overflow-y-auto px-inset-panel">{children}</div>
        <div className="shrink-0 px-inset-panel">{footer}</div>
      </div>
    </div>
  );
}

export interface ModalFooterProps {
  /** Usually the cancel button. */
  start: ReactNode;
  /** Usually the save button. */
  end: ReactNode;
}

/**
 * Holds the modal-footer inset exception: 8 top and bottom ON TOP of the `region` gap and the panel
 * inset, so the buttons sit 52 below the form and 48 above the modal edge. Intentional.
 */
export function ModalFooter({ start, end }: ModalFooterProps) {
  return (
    <div className="py-modal-footer-y">
      <Split start={start} end={end} minRelation="group" />
    </div>
  );
}
