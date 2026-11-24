// EXPECT: onehub/no-class-or-style-props
import { BodyText, Stack } from "@onehub/ds";

export const V2 = () => (
  <Stack relation="related" style={{ marginTop: 13 }}>
    <BodyText>Hello</BodyText>
  </Stack>
);
