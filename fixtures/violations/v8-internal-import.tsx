// EXPECT: no-restricted-imports
// Base components are internal. A screen that reaches for one is rejected; it must use a role component.
import { BaseButton } from "../../src/components/buttons/BaseButton";

export const V8 = () => <BaseButton look="filled">Save</BaseButton>;
