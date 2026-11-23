// EXPECT: onehub/no-class-or-style-props
import { Stack, Text } from "@onehub/ds";

export const V2 = () => (
  <Stack relation="related" style={{ marginTop: 13 }}>
    <Text variant="body">Hello</Text>
  </Stack>
);
