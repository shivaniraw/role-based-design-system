// Custom ESLint rules that keep screens on the design system.
// Scope is set in eslint.config.js: the class rule runs on all source; the others on screens only.

/** Class-name patterns that are not part of the OneHub token vocabulary. */
const CLASS_PATTERNS = [
  {
    id: "arbitrary value",
    re: /(?:^|[\s:])!?[a-z][\w-]*-\[[^\]]+\]/i,
    hint: "Arbitrary values like mt-[13px] are not allowed. Use a role token via a component prop.",
  },
  {
    id: "arbitrary variant",
    re: /(?:^|\s)\[[^\]]+\]:/,
    hint: "Arbitrary variants are not allowed.",
  },
  {
    id: "default spacing scale",
    re: /(?:^|[\s:])-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|w|h|size|min-w|min-h|max-w|max-h|top|right|bottom|left|inset|inset-x|inset-y|basis)-\d+(?:\.\d+)?(?=\s|$)/,
    hint: "Numeric spacing classes (p-4, gap-6, w-72) do not exist. Use relation / inset props.",
  },
  {
    id: "default palette color",
    re: /(?:^|[\s:])(?:bg|text|border|ring|fill|stroke|from|to|via|outline|divide|accent|caret|decoration|shadow|placeholder)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}/,
    hint: "Palette colors (bg-blue-500) do not exist. Colors come from roles.",
  },
  {
    id: "white/black color",
    re: /(?:^|[\s:])(?:bg|text|border|ring|fill|stroke|outline|divide)-(?:white|black)(?=[\s/]|$)/,
    hint: "bg-white / text-black do not exist. Use surface and text roles.",
  },
  {
    id: "default type scale",
    re: /(?:^|[\s:])text-(?:xs|sm|base|lg|xl|[2-9]xl)(?=\s|$)/,
    hint: "Default text sizes do not exist. Use <Text variant>.",
  },
  {
    id: "default radius scale",
    re: /(?:^|[\s:])rounded(?:-[a-z]{1,2})?-(?:xs|sm|md|lg|xl|2xl|3xl)(?=\s|$)/,
    hint: "Default radii do not exist. Components own their radius.",
  },
  {
    id: "default shadow scale",
    re: /(?:^|[\s:])shadow-(?:xs|sm|md|lg|xl|2xl|inner)(?=\s|$)/,
    hint: "Default shadows do not exist.",
  },
  {
    id: "default font weight",
    re: /(?:^|[\s:])font-(?:thin|extralight|light|normal|semibold|extrabold|black)(?=\s|$)/,
    hint: "Only font-regular, font-medium and font-bold exist.",
  },
  {
    id: "responsive prefix",
    re: /(?:^|\s)(?:sm|md|lg|xl|2xl|max-sm|max-md|max-lg|max-xl):[\w-]/,
    hint: "Responsive prefixes are not allowed: the CMS is desktop-only.",
  },
];

/** Raw design values that must never appear in a screen. */
const RAW_VALUE_PATTERNS = [
  { id: "hex color", re: /#[0-9a-f]{3,8}\b/i },
  { id: "pixel or relative length", re: /(?:^|[^\w.])\d+(?:\.\d+)?(?:px|rem|em|vh|vw)\b/ },
  { id: "color function", re: /\b(?:rgb|rgba|hsl|hsla|oklch)\(/ },
];

function stringsOf(node) {
  if (node.type === "Literal" && typeof node.value === "string") return [node.value];
  if (node.type === "TemplateElement") return [node.value.cooked ?? node.value.raw];
  return [];
}

function isImportSource(node) {
  return node.parent && (node.parent.type === "ImportDeclaration" || node.parent.type === "ExportNamedDeclaration" || node.parent.type === "ExportAllDeclaration");
}

const noOffSystemClasses = {
  meta: {
    type: "problem",
    schema: [],
    messages: { off: "Off-system class ({{kind}}): {{hint}} Found in: \"{{snippet}}\"" },
  },
  create(context) {
    const check = (node) => {
      if (isImportSource(node)) return;
      for (const value of stringsOf(node)) {
        for (const pattern of CLASS_PATTERNS) {
          const match = pattern.re.exec(value);
          if (match) {
            context.report({
              node,
              messageId: "off",
              data: { kind: pattern.id, hint: pattern.hint, snippet: match[0].trim() },
            });
          }
        }
      }
    };
    return { Literal: check, TemplateElement: check };
  },
};

const noClassOrStyleProps = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      banned:
        "Do not pass `{{name}}` in a screen. Spacing comes from `relation` and `inset`; everything else comes from role components (SaveButton, PageTitle, ErrorBanner...).",
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
        if (name === "className" || name === "style" || name === "class") {
          context.report({ node, messageId: "banned", data: { name } });
        }
      },
    };
  },
};

const noRawElements = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      raw: "Raw <{{tag}}> is not allowed in a screen. Use Stack, Inline, Split, Box, Text or another design-system component. If nothing fits, stop and report `needs-new-component`.",
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type === "JSXIdentifier" && /^[a-z]/.test(node.name.name)) {
          context.report({ node, messageId: "raw", data: { tag: node.name.name } });
        }
      },
    };
  },
};

const noRawValues = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      raw: "Raw {{kind}} \"{{snippet}}\" in a screen. Use a role from the design system instead of a literal value.",
    },
  },
  create(context) {
    const check = (node) => {
      if (isImportSource(node)) return;
      for (const value of stringsOf(node)) {
        for (const pattern of RAW_VALUE_PATTERNS) {
          const match = pattern.re.exec(value);
          if (match) {
            context.report({ node, messageId: "raw", data: { kind: pattern.id, snippet: match[0].trim() } });
          }
        }
      }
    };
    return { Literal: check, TemplateElement: check };
  },
};

export default {
  meta: { name: "onehub-ds" },
  rules: {
    "no-off-system-classes": noOffSystemClasses,
    "no-class-or-style-props": noClassOrStyleProps,
    "no-raw-elements": noRawElements,
    "no-raw-values": noRawValues,
  },
};
