import { Fragment } from "react";
import { Icon } from "../icons";
import { Text } from "../primitives/Text";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  /** Items after the home icon. The last one is the current page. */
  items: BreadcrumbItem[];
  homeHref?: string;
}

/** Home icon, chevron, then the trail. Parts of one element, so the gap is `attached`. */
export function Breadcrumb({ items, homeHref = "/" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-attached text-text-muted">
      <a href={homeHref} aria-label="Home" className="inline-flex focus-visible:outline-2 focus-visible:outline-action">
        <Icon name="home" />
      </a>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <Fragment key={`${item.label}-${index}`}>
            <Icon name="chevronRight" />
            {item.href && !last ? (
              <a href={item.href} className="focus-visible:outline-2 focus-visible:outline-action">
                <Text variant="heading" weight="regular" tone="secondary">
                  {item.label}
                </Text>
              </a>
            ) : (
              <span aria-current={last ? "page" : undefined}>
                <Text variant="heading" weight="regular" tone="secondary">
                  {item.label}
                </Text>
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
