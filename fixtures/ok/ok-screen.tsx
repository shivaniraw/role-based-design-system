// A screen that follows every rule. `npm run test:guardrails` proves it passes lint and typecheck.
import { Box, CancelButton, Inline, SaveButton, SectionHeading, Stack, TextField } from "@onehub/ds";

export function OkScreen() {
  return (
    <Box inset="panel">
      <Stack relation="region">
        <SectionHeading>Add New Word</SectionHeading>
        <Stack relation="group">
          <TextField label="English Source Text" required placeholder="Enter Source Text" />
          <TextField label="Developer key" placeholder="Enter Dev_key" />
        </Stack>
        <Inline relation="related">
          <CancelButton />
          <SaveButton />
        </Inline>
      </Stack>
    </Box>
  );
}
