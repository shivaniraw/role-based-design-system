import { Icon } from "../icons";
import { Stack } from "../primitives/Stack";
import { BaseText } from "../primitives/text/BaseText";

export interface AvatarProps {
  /** The first letter is shown. */
  name: string;
}

export function Avatar({ name }: AvatarProps) {
  return (
    <span className="ds-avatar-ring inline-flex size-avatar shrink-0 rounded-pill p-ring" aria-hidden="true">
      <span className="flex size-full items-center justify-center rounded-pill bg-surface-card text-heading font-medium text-action">
        {name.trim().charAt(0).toUpperCase()}
      </span>
    </span>
  );
}

export interface ProfileMenuProps {
  name: string;
  /** The line under the name, for example "Admin". */
  subtitle: string;
  onClick?: () => void;
}

/**
 * Avatar, name block and chevron. Holds the profile exceptions: gap 16 between parts and
 * 4 inset on all sides.
 */
export function ProfileMenu({ name, subtitle, onClick }: ProfileMenuProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="menu"
      className="flex cursor-pointer items-center gap-profile-gap rounded-control p-profile-inset text-left hover:bg-neutral-surface focus-visible:outline-2 focus-visible:outline-action"
    >
      <Avatar name={name} />
      <Stack relation="subtext">
        <BaseText variant="table" weight="medium" tone="secondary">
          {name}
        </BaseText>
        <BaseText variant="caption" tone="muted">
          {subtitle}
        </BaseText>
      </Stack>
      <span className="text-text-secondary">
        <Icon name="chevronDown" />
      </span>
    </button>
  );
}
