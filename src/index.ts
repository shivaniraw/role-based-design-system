// Public API of the OneHub design system. Screens import ONLY from here.
//
// Rule: every family has an internal Base component (BaseButton, BaseIconButton, BaseBadge,
// BaseNotification, BaseText) that holds the shared styles. Base components are NEVER exported.
// Screens use the role components below. If a screen needs something new, add a new role
// component next to its Base (for example buttons/ExportButton.tsx), never a prop on an old one.
export { Stack, Form } from "./primitives/Stack";
export { Inline } from "./primitives/Inline";
export { Split } from "./primitives/Split";
export { Box, Page } from "./primitives/Box";

// Text, by role
export { PageTitle } from "./primitives/text/PageTitle";
export { SectionHeading } from "./primitives/text/SectionHeading";
export { BodyText } from "./primitives/text/BodyText";
export { EmptyMessage } from "./primitives/text/EmptyMessage";
export { MetaText } from "./primitives/text/MetaText";
export { GroupLabel } from "./primitives/text/GroupLabel";

// Buttons, by what the click does
export { AddButton } from "./components/buttons/AddButton";
export { SaveButton } from "./components/buttons/SaveButton";
export { SaveAsButton } from "./components/buttons/SaveAsButton";
export { CancelButton } from "./components/buttons/CancelButton";
export { LanguageButton } from "./components/buttons/LanguageButton";
export { PublishButton } from "./components/buttons/PublishButton";
export { PublishToTestButton } from "./components/buttons/PublishToTestButton";

// Icon-only buttons, by what the click does
export { EditButton } from "./components/icon-buttons/EditButton";
export { DeleteButton } from "./components/icon-buttons/DeleteButton";
export { CloseButton } from "./components/icon-buttons/CloseButton";
export { BackButton } from "./components/icon-buttons/BackButton";
export { PageHeading, type PageHeadingProps } from "./components/PageHeading";
export { CopyKeyButton } from "./components/icon-buttons/CopyKeyButton";
export { OpenButton } from "./components/icon-buttons/OpenButton";

// Badges and messages, by what they say
export { VersionBadge } from "./components/badges/VersionBadge";
export { CountBadge } from "./components/badges/CountBadge";
export { NewBadge } from "./components/badges/NewBadge";
export { ErrorBanner } from "./components/notifications/ErrorBanner";
export { SuccessBanner } from "./components/notifications/SuccessBanner";
export { ErrorToast } from "./components/notifications/ErrorToast";
export { SuccessToast } from "./components/notifications/SuccessToast";

// Everything else
export { TextField, SelectField, TextArea } from "./components/Field";
export { Checkbox, OptionBox } from "./components/Checkbox";
export { FileUpload } from "./components/FileUpload";
export { Tabs } from "./components/Tabs";
export { Card } from "./components/Card";
export { Modal, ModalFooter } from "./components/Modal";
export { Breadcrumb } from "./components/Breadcrumb";
export { Avatar, ProfileMenu } from "./components/Profile";
export { Logo, AppSelector, LeftNav, TopBar, AppShell } from "./components/Navigation";
export { DataTable, TextCell, NumberCell, ScreenshotCell, DropdownCell, InputCell, CheckboxCell, DevKeyCell, EnvironmentCell, TextAreaCell, EnvironmentPairCell } from "./components/DataTable";

export { RELATIONS, INSETS } from "./tokens";
export type { Relation, Inset } from "./tokens";
export type { FieldStatus, SelectOption } from "./components/Field";
export type { TabItem } from "./components/Tabs";
export type { NavEntry } from "./components/Navigation";
export type { Column } from "./components/DataTable";
export type { UploadedFile } from "./components/FileUpload";
