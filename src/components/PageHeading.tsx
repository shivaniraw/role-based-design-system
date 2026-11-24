import type { ReactNode } from "react";
import { BackButton } from "./icon-buttons/BackButton";
import { PageTitle } from "../primitives/text/PageTitle";

export interface PageHeadingProps {
  /** The page's one title. */
  title: string;
  /** Accessible name of the back arrow. */
  backLabel?: string;
  onBack?: () => void;
  /** The line under the title, for example a <VersionBadge>. */
  meta?: ReactNode;
}

/**
 * Back arrow + page title, with an optional line under the title.
 * The arrow sits in a box exactly one title line tall (`h-lh` inside `text-title`, PageTitle's size), so it is always
 * centered on the title's first line, whatever the title size. The meta line sits directly under the title (no gap) and lines up with the title text.
 */
export function PageHeading({ title, backLabel = "Back", onBack, meta }: PageHeadingProps) {
  return (
    <div className="flex items-start gap-related">
      <span className="flex h-lh shrink-0 items-center text-title">
        <BackButton label={backLabel} onClick={onBack} />
      </span>
      <div className="flex flex-col">
        <PageTitle>{title}</PageTitle>
        {meta}
      </div>
    </div>
  );
}
