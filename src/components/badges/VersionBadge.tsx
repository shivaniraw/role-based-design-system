import { BaseBadge } from "./BaseBadge";

/** The published version of a page: "Version 1". */
export function VersionBadge({ version }: { version: number }) {
  return <BaseBadge look="label">{`Version ${version}`}</BaseBadge>;
}
