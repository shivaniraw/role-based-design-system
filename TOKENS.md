# Token status and decisions made in code

## Confirmed
- Spacing: all 8 gap relations and 9 insets and the 6 exceptions, from the OneHub spacing doc.
- Brand blue `#4285F4` (you confirmed).
- `#F6F6F6` neutral surface, `#424242` secondary text, radius 10, "Button/16 Medium" (read from Figma variables on Base Button).
- Heights from Figma components: button 44, tab 56, top bar 72, avatar 44, left nav 379 wide.

## Approximated from screenshots (verify against the Figma variables export)
| Token | Used | Note |
|---|---|---|
| `action-hover`, `action-pressed` | #3B78E7, #3367D6 | Derived; Figma has no hover or pressed for filled buttons |
| `action-disabled` | #A9C7FA | Light blue read from screenshots |
| `action-tint` | #EEF4FE | Active tab band, outline pressed |
| `border` | #DADCE0 | |
| `surface-page`, `surface-subtle` | #F5F5F5, #F8F9FA | |
| `feedback-error / success` and their backgrounds | #D93025 / #FCE8E6, #1E8E3E / #E6F4EA | Google palette |
| Type sizes | title 20, heading 18, nav 16, body 14, table 13, caption 12 | Only Button 16 is confirmed |
| `field-h` 40, `row-h` 56, `modal-w` 760, `upload-h` 140, column widths | | Read from screenshots |
| Radii field 8, badge 6, panel 20 | | |

## Differences from Figma, fixed in code
1. CTA prop is `action`, not `role` (avoids ARIA `role` and user "Admin" roles).
2. Button icon gap is 8 (`attached`, as in Figma); the spacing doc says icon to label is 12 but does not cover buttons.
3. Buttons have fixed height 44 and no vertical padding (the doc's rule). Figma showed padding 10.
4. Nav items are a fixed 54 high in both states (Figma had 54 vs 51; the doc's padding of 10 would give 44).
5. Placeholder color is `#757575` (passes contrast) instead of the lighter gray in Figma.
6. Option boxes and inputs share one border color (Figma had a darker border on option boxes).
7. Added what Figma lacks: focus rings, hover and pressed states, drag-over and error states for upload, readonly and disabled fields.
8. Email input is a `TextField` with `status`. Error banner and success toast are one `Notification`.
9. The edit pencil follows the screens (Module header) and is a per-column `headerEdit`, not part of the table design.
10. The table scrolls inside the card instead of overflowing it; long text truncates with a tooltip; `dir="auto"` handles right-to-left text.
11. `SplitButton`: both halves open the environment menu (assumption).
12. Modal: Escape closes, focus is trapped and restored, clicking outside does NOT close it (avoids losing typed input).

## Not built yet
- Real logo asset (placeholder mark), Google Sans web delivery (falls back to system fonts).
- Link icon in table rows (purpose unknown), delete confirmation dialog, `navigate-back` page patterns.
- Visual regression against Figma exports.
