# Token status and decisions made in code

## Confirmed
- Spacing: all 8 gap relations and 9 insets and the 6 exceptions, from the OneHub spacing doc.
- Brand blue `#4285F4` (you confirmed).
- `#F6F6F6` neutral surface, `#424242` secondary text, radius 10, "Button/16 Medium" (read from Figma variables on Base Button).
- Heights from Figma components: button 44, tab 56, top bar 72, avatar 44, left nav 330 wide.

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
| `field-h` 40, `row-h` 60, `modal-w` 784, `upload-h` 140, column widths | | Read from screenshots |
| Radii field 8, badge 6, panel 20 | | |

## Differences from Figma, fixed in code
1. Roles are components, not props: `SaveButton`, `CancelButton`, `PageTitle`... each wraps an internal Base component (`BaseButton`, `BaseText`...) that is never exported.
2. Button icon gap is 8 (`attached`, as in Figma); the spacing doc says icon to label is 12 but does not cover buttons.
3. Buttons have fixed height 44 and no vertical padding (the doc's rule). Figma showed padding 10.
4. Nav items and the language selector are a fixed 46 high, and nav items are 12 apart (`related`). The logo tile is 36 x 34.
5. Placeholder color is `#757575` (passes contrast) instead of the lighter gray in Figma.
6. Option boxes and inputs share one border color (Figma had a darker border on option boxes).
7. Added what Figma lacks: focus rings, hover and pressed states, drag-over and error states for upload, readonly and disabled fields.
8. Email input is a `TextField` with `status`. Banners and toasts share an internal `BaseNotification`, exposed as `ErrorBanner`, `SuccessBanner`, `ErrorToast`, `SuccessToast`.
9. The edit pencil follows the screens (Module header) and is a per-column `headerEdit`, not part of the table design.
10. The table scrolls inside the card instead of overflowing it; long text truncates with a tooltip; `dir="auto"` handles right-to-left text.
11. `PublishButton`: both halves open the environment menu (assumption).
12. Modal: Escape closes, focus is trapped and restored, clicking outside does NOT close it (avoids losing typed input).

## Not built yet
- Real logo asset (placeholder mark), Google Sans web delivery (falls back to system fonts).
- Link icon in table rows (purpose unknown), delete confirmation dialog, `navigate-back` page patterns.
- Visual regression against Figma exports.

## Matched to Figma (TMS Design System, read directly from the file)
Colors, type sizes, radii, shadows, icons and component sizes now come from the Figma component specs
(Left Nav bar, App Selector, Top Bar, Text Input, Select Field, Textarea, Image Upload, Checkbox Option,
Modal / Add Translation, Tabs, Data Table, Table Cell, Table Header Cell, Cancel Button) and the TMS page
header. Icons are exported from the Foundations page (Icon/Home, Apps, Translate, Chevrons, Upload, Edit,
Language, Error, Success, Checkbox On/Off).

## Where Figma and the spacing tokens disagree (spacing tokens kept)
| Space | Figma | Spacing token used |
|---|---|---|
| Field label to input | 10 | `subtext` 6 |
| Select Page to Select Module, filter to filter, tabs to table | 24 | `group` 28 |
| Tab to tab | 30 | `group` 28 |
| Option box side padding | 12 (component) / 6 (screen) | `option-card-x` 6 |
| Modal footer top/bottom | 10 | `modal-footer-y` 8 |
| Text Input / Select border | #E0E0E0 (component), #BDBDBD (screens) | #E0E0E0 |

One spacing change follows Figma: "All Apps" to the nav list is now `group` (Figma 30), not `related`.

## Side nav type
Nav item labels are 18px (`text-nav-item`); the "All Apps" heading is 20px (`title` text role). The language
selector is 20px.

## Top bar type
The breadcrumb page name ("Translation Management System") is 20px Regular, using the `title` text role.
It is set inside the Breadcrumb component, so every screen that uses TopBar picks it up.

## Page title
PageTitle is 18px Medium (`heading` text role). The old 24px `nav` size is no longer used and was removed.
PageHeading lays out the back arrow and the title: the arrow sits in a box one title line tall, so it is
centered on the title line. The version line sits directly under the title with no gap and lines up with the title text.

## Subtext spacing
`subtext` (a line of text and the smaller line under it) is 6px, up from 4. It covers a field label → its input (Select Page, Select Module and every other labelled field), an input → its helper or error line, User Name → Admin, the upload box → its message, and banner title → message.

## Pulled from Figma (24 Nov)
| What | Before | Now |
|---|---|---|
| Table row height (`row-h`) | 80 | 60, content centered, no vertical padding |
| Table thumbnail (`screenshot`) | 31 x 62 | 31 x 48 (6 above and below) |
| Left nav width (`nav-w`) | 379 | 330 |
| Title style (`text-title`) | 20 Medium | 18 Medium: brand name, page title, modal title |
| Nav tab text (`text-nav-item`) | 18 Regular | 18 Regular (matches the Figma style) |
| "All Apps" heading | 20 | Label 14 Medium, muted (as in Figma) |
| Upload box (`upload-h`) | 100 | 140 |
| Dashed stroke (`--dash-border-dashed`) | CSS dashed | 1px, dash 4, gap 2, drawn by the internal DashedOutline so it matches Figma |

The 20px size the breadcrumb, app selector and avatar letter use is now its own token, `text-large`,
so changing the Title style doesn't move them. The old 28px `display` size is gone.
