import type { ReactNode } from "react";
import { Icon, type IconName } from "../icons";
import { cx } from "../lib/cx";
import { Box } from "../primitives/Box";
import { Split } from "../primitives/Split";
import { Stack } from "../primitives/Stack";
import { BaseText } from "../primitives/text/BaseText";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { ProfileMenu } from "./Profile";
import type { SelectOption } from "./Field";

/** Placeholder mark. Replace with the real OneHub logo asset. */
export function Logo({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-attached">
      <svg viewBox="0 0 44 44" className="size-avatar shrink-0" fill="none" strokeWidth={6} aria-hidden="true">
        <path d="M22 8a14 14 0 0 1 14 14" className="stroke-action" />
        <path d="M36 22a14 14 0 0 1-14 14" className="stroke-brand-green" />
        <path d="M22 36A14 14 0 0 1 8 22" className="stroke-brand-yellow" />
        <path d="M8 22A14 14 0 0 1 22 8" className="stroke-brand-red" />
      </svg>
      <BaseText variant="title" weight="regular" tone="secondary">
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

/** The pill dropdown at the top of the nav (language). */
export function AppSelector({ value, options, onChange, ariaLabel }: AppSelectorProps) {
  return (
    <div className="flex h-field-h w-full items-center rounded-pill border border-border bg-surface-card px-inset-field-x focus-within:outline-2 focus-within:outline-action">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full min-w-zero grow cursor-pointer appearance-none bg-transparent text-body text-text-secondary outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none text-text-secondary">
        <Icon name="chevronDown" />
      </span>
    </div>
  );
}

export interface NavEntry {
  id: string;
  label: string;
  icon: IconName;
}

function NavItem({ entry, selected, onSelect }: { entry: NavEntry; selected: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      aria-current={selected ? "page" : undefined}
      onClick={() => onSelect(entry.id)}
      className={cx(
        "flex h-nav-item-h w-full cursor-pointer items-center gap-icon-label rounded-control px-inset-control-x text-left text-nav focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-action",
        selected ? "bg-action-tint text-action" : "text-text-secondary hover:bg-neutral-surface",
      )}
    >
      <Icon name={entry.icon} />
      {entry.label}
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
 * Left navigation. Spacing per the spacing doc: sidebar inset 16 / 14; logo row, language and
 * "All Apps" are `group` apart; heading to first item is `related`; items are `choices` apart.
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
    <aside className="flex w-nav-w shrink-0 flex-col bg-surface-card px-inset-container-x py-inset-container-y">
      <Stack relation="group">
        <Box inset="controlX">
          <Logo name={appName} />
        </Box>
        <AppSelector value={language} options={languageOptions} onChange={onLanguageChange} ariaLabel="Language" />
        <Stack relation="related" as="nav" aria-label={sectionLabel}>
          <Box inset="controlX">
            <BaseText variant="nav">{sectionLabel}</BaseText>
          </Box>
          <Stack relation="choices">
            {items.map((entry) => (
              <NavItem key={entry.id} entry={entry} selected={entry.id === selectedId} onSelect={onSelect} />
            ))}
          </Stack>
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
