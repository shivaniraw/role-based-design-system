import type { ReactNode } from "react";
import { Icon, type IconName } from "../icons";
import { cx } from "../lib/cx";
import { Box } from "../primitives/Box";
import { Split } from "../primitives/Split";
import { Stack } from "../primitives/Stack";
import { BaseText } from "../primitives/text/BaseText";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { ProfileMenu } from "./Profile";
import { Listbox, type SelectOption } from "./select/Listbox";

/** Figma: Logo (32:60) + brand name. Blue 43 x 42 tile, radius 8, white translate mark; name Display/28 Medium. */
export function Logo({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-attached">
      <span className="flex h-logo-h w-logo-w shrink-0 items-center justify-center rounded-field bg-action text-on-action" aria-hidden="true">
        <Icon name="translate" />
      </span>
      <BaseText variant="display" tracking="nav">
        {name}
      </BaseText>
    </div>
  );
}

export interface AppSelectorProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
}

/** Figma: App Selector (32:56). The pill dropdown at the top of the nav (language). */
export function AppSelector({ value, options, onChange, ariaLabel }: AppSelectorProps) {
  return <Listbox look="selector" options={options} value={value} onChange={onChange} ariaLabel={ariaLabel} />;
}

export interface NavEntry {
  id: string;
  label: string;
  icon: IconName;
}

/**
 * Figma: Nav tabs (32:55). 54 tall, 22 side padding, 24 icon + 12 gap + 18px Regular #424242 (`text-nav-item`).
 * Selected: #F2F7FF fill, radius 8, blue text and icon.
 */
function NavItem({ entry, selected, onSelect }: { entry: NavEntry; selected: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      aria-current={selected ? "page" : undefined}
      onClick={() => onSelect(entry.id)}
      className={cx(
        "flex h-nav-item-h w-full cursor-pointer items-center gap-icon-label rounded-field px-inset-control-x text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-action",
        selected ? "bg-action-subtle text-action" : "text-text-secondary hover:bg-neutral-surface",
      )}
    >
      <Icon name={entry.icon} />
      <span className="min-w-zero grow truncate text-nav-item tracking-nav">{entry.label}</span>
    </button>
  );
}

export interface LeftNavProps {
  appName: string;
  language: string;
  languageOptions: SelectOption[];
  onLanguageChange: (value: string) => void;
  /** Heading above the items, for example "All Apps". */
  sectionLabel: string;
  items: NavEntry[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * Figma: Left Nav bar (32:63). 379 wide, white, 1px right border, inset 16 across / 14 down.
 * Brand, selector, "All Apps" and the list are `group` apart (Figma shows ~30); items are `choices` apart.
 */
export function LeftNav({
  appName,
  language,
  languageOptions,
  onLanguageChange,
  sectionLabel,
  items,
  selectedId,
  onSelect,
}: LeftNavProps) {
  return (
    <aside className="flex w-nav-w shrink-0 flex-col border-r border-border-tab bg-surface-card px-inset-container-x py-inset-container-y">
      <Stack relation="group">
        <Box inset="control">
          <Logo name={appName} />
        </Box>
        <AppSelector value={language} options={languageOptions} onChange={onLanguageChange} ariaLabel="Language" />
        <Box inset="controlX">
          <BaseText variant="title" tone="secondary">
            {sectionLabel}
          </BaseText>
        </Box>
        <Stack relation="choices" as="nav" aria-label={sectionLabel}>
          {items.map((entry) => (
            <NavItem key={entry.id} entry={entry} selected={entry.id === selectedId} onSelect={onSelect} />
          ))}
        </Stack>
      </Stack>
    </aside>
  );
}

export interface TopBarProps {
  breadcrumb: BreadcrumbItem[];
  userName: string;
  userSubtitle: string;
}

/** The 72px top bar. Content is centered, so there is no vertical padding. */
export function TopBar({ breadcrumb, userName, userSubtitle }: TopBarProps) {
  return (
    <header className="flex h-topbar-h shrink-0 items-center bg-surface-card px-inset-page">
      <div className="w-full">
        <Split
          start={<Breadcrumb items={breadcrumb} />}
          end={<ProfileMenu name={userName} subtitle={userSubtitle} />}
        />
      </div>
    </header>
  );
}

export interface AppShellProps {
  nav: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

/** Left nav on the left; top bar and page on the right. */
export function AppShell({ nav, header, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      {nav}
      <div className="flex min-w-zero grow flex-col">
        {header}
        {children}
      </div>
    </div>
  );
}
