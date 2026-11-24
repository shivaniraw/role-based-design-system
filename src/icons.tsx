import type { ReactNode } from "react";
import { cx } from "./lib/cx";

// Paths marked "Figma" are exported from the TMS Design System Foundations page (Icon/* components),
// so they match the design exactly. The others have no Figma icon yet.
const PATHS: Record<string, ReactNode> = {
  /* Figma: Icon/Home (3:6) */
  home: <path d="M3 10.5L12 3L21 10.5V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H15V15H9V21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V10.5Z" />,
  /* Figma: Icon/Apps (3:40) */
  apps: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  /* Figma: Icon/Translate (3:32) */
  translate: <path d="M4 5H13M8.5 3V5M11 5C10.2 8.6 7.8 11.6 4.5 13.5M6.5 8.5C7.7 10.5 9.4 12.1 11.5 13.1M13 21L17 11L21 21M14.4 17.5H19.6" />,
  /* Figma: Icon/Chevron Down (3:16) */
  chevronDown: <path d="M6 9L12 15L18 9" />,
  /* Figma: Icon/Chevron Right (3:11) */
  chevronRight: <path d="M9 6L15 12L9 18" />,
  /* Figma: Icon/Upload (3:21) */
  upload: <path d="M12 15V4M17 9L12 4L7 9M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" />,
  /* Figma: Icon/Language (3:27) */
  globe: (
    <>
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
      <path d="M3 12H21M12 3C14.5 5.5 15.8 8.5 15.8 12C15.8 15.5 14.5 18.5 12 21C9.5 18.5 8.2 15.5 8.2 12C8.2 8.5 9.5 5.5 12 3Z" />
    </>
  ),
  /* Figma: Icon/Logout (3:45) */
  logout: <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 7L21 12L16 17M21 12H9" />,
  /* Figma: Icon/Plus (3:50) */
  plus: <path d="M12 5V19M5 12H19" />,
  /* Figma: Icon/Edit (3:55) */
  pencil: <path d="M13.5 8.49998L15.5 10.5M4 20H8L18.5 9.49998C18.8978 9.10216 19.1213 8.56259 19.1213 7.99998C19.1213 7.43737 18.8978 6.89781 18.5 6.49998C18.1022 6.10216 17.5626 5.87866 17 5.87866C16.4374 5.87866 15.8978 6.10216 15.5 6.49998L5 17V20H4Z" />,
  /* Figma: Icon/Error (3:61) */
  alertCircle: (
    <>
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
      <path d="M12 7.5V13M12 16.5V16.51" />
    </>
  ),
  /* Figma: Icon/Success (3:67), filled */
  checkCircle: (
    <>
      <path d="M12 23.5C18.3513 23.5 23.5 18.3513 23.5 12C23.5 5.64873 18.3513 0.5 12 0.5C5.64873 0.5 0.5 5.64873 0.5 12C0.5 18.3513 5.64873 23.5 12 23.5Z" fill="currentColor" stroke="none" />
      <path d="M7 12.5L10.2 15.7L17 9" stroke="white" strokeWidth={2.2} />
    </>
  ),
  /* Figma: Icon/Checkbox Off (3:72) */
  checkboxOff: <path d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z" />,
  /* Figma: Icon/Checkbox On (3:78), filled */
  checkboxOn: (
    <>
      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" fill="currentColor" stroke="none" />
      <path d="M7.5 12.2L10.5 15.2L16.5 8.80005" stroke="white" />
    </>
  ),
  /* No Figma icon yet */
  arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  link: (
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  ),
  externalLink: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  trash: <path d="M5 7h14M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  xCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
  bell: <path d="M6 17v-6a6 6 0 0 1 12 0v6l1.5 2h-15zM10 21h4" />,
  spinner: <path d="M12 3a9 9 0 1 0 9 9" />,
};

export type IconName = keyof typeof PATHS;

const SIZE = { sm: "size-icon-sm", field: "size-icon-field", md: "size-icon", lg: "size-icon-lg" } as const;

export interface IconProps {
  name: IconName;
  /** sm 16, field 20 (select chevrons), md 24 (default), lg 36 (upload). */
  size?: "sm" | "field" | "md" | "lg";
  spin?: boolean;
}

/** Decorative icon. Color comes from the surrounding text color. */
export function Icon({ name, size = "md", spin }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cx("shrink-0", SIZE[size], spin && "animate-spin")}
    >
      {PATHS[name]}
    </svg>
  );
}
