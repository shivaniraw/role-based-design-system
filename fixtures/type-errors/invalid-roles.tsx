// Every line below must be a TypeScript error: invalid roles and props do not compile.
import { Button, Stack, Text } from "@onehub/ds";

export const T1 = () => <Button action="submit">Go</Button>; // unknown action
export const T2 = () => (
  <Stack relation="medium">
    <Text variant="body">x</Text>
  </Stack>
); // unknown relation
export const T3 = () => <Button action="save" className="x">Save</Button>; // className not accepted
export const T4 = () => <Text variant="huge">x</Text>; // unknown text variant
