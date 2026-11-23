// A screen that follows every rule. `npm run test:guardrails` proves it passes lint and typecheck.
import { Box, Button, Inline, Stack, Text, TextField } from "@onehub/ds";

export function OkScreen() {
  return (
    <Box inset="panel">
      <Stack relation="region">
        <Text variant="heading" as="h1">
          Add New Word
        </Text>
        <Stack relation="group">
          <TextField label="English Source Text" required placeholder="Enter Source Text" />
          <TextField label="Developer key" placeholder="Enter Dev_key" />
        </Stack>
        <Inline relation="related">
          <Button action="cancel">Cancel</Button>
          <Button action="save">Save</Button>
        </Inline>
      </Stack>
    </Box>
  );
}
