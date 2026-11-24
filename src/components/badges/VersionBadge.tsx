import { BaseText } from "../../primitives/text/BaseText";

/**
 * The published version of a page. Figma (TMS page header): one 32-tall #F5F5F5 pill, radius 8.
 * Left segment #EAEAEA with "Version N" in Bold 14 #333333; then the publish line in Regular 14 #424242.
 */
export function VersionBadge({ version, published }: { version: number; published?: string }) {
  return (
    <span className="inline-flex h-version-h self-start items-center gap-attached overflow-hidden rounded-field bg-surface-page pr-inset-badge-x">
      <span className="flex h-full items-center bg-badge-segment px-inset-badge-x text-body font-bold text-text">{`Version ${version}`}</span>
      {published ? (
        <BaseText variant="body" tone="secondary">
          {published}
        </BaseText>
      ) : null}
    </span>
  );
}
