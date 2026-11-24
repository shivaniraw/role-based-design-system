// Every line below must be a TypeScript error: roles are components, so prop-based roles,
// base components and styling escape hatches do not compile.
import { BaseButton, Button, SaveButton, Stack, BodyText } from "@onehub/ds";

export const T1 = () => <Button action="save">Go</Button>; // no generic Button: pick a role component
export const T2 = () => <BaseButton look="filled">Go</BaseButton>; // BaseButton is internal
export const T3 = () => (
  <Stack relation="medium">
    <BodyText>x</BodyText>
  </Stack>
); // unknown relation
export const T4 = () => <SaveButton className="x" />; // className not accepted
export const T5 = () => <SaveButton look="outline" />; // a role's look can't be changed
