import { Fragment } from "react";
import { Icon } from "../icons";
import { BaseText } from "../primitives/text/BaseText";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  /** Items after the home icon. The last one is the current page. */
  items: BreadcrumbItem[];
  homeHref?: string;
}

/**
 * Figma: Top Bar breadcrumb. Home 24 (#757575), chevron 24 (#999999), title 20 Regular #5C5C5C (`large` text role).
 * Parts of one element, so the gap is `attached` (8).
 */
export function Breadcrumb({ items, homeHref = "/" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-attached">
      <a href={homeHref} aria-label="Home" className="inline-flex text-text-muted focus-visible:outline-2 focus-visible:outline-action">
        <Icon name="home" />
      </a>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <Fragment key={`${item.label}-${index}`}>
            <span className="inline-flex text-text-placeholder">
              <Icon name="chevronRight" />
            </span>
            {item.href && !last ? (
              <a href={item.href} className="focus-visible:outline-2 focus-visible:outline-action">
                <BaseText variant="large" tone="tertiary">
                  {item.label}
                </BaseText>
              </a>
            ) : (
              <span aria-current={last ? "page" : undefined}>
                <BaseText variant="large" tone="tertiary">
                  {item.label}
                </BaseText>
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
