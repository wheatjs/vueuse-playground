import { EditorView } from '@codemirror/basic-setup'
import type { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

export const oneDarkTheme = EditorView.theme({
  '&': {
    color: 'var(--cm-foreground)',
    backgroundColor: 'var(--cm-background)',
  },

  '.cm-content': {
    fontSize: 'var(--cm-font-size)',
    fontFamily: 'var(--cm-font-family)',
    caretColor: 'var(--cm-foreground)',
    padding: '0 !important',
  },

  '.cm-cursor, .cm-dropCursor': { border: 'none', backgroundColor: 'var(--cm-foreground)', width: '2px' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: 'var(--cm-selection-background)' },

  '.cm-panels': { backgroundColor: 'var(--cm-background)', color: 'var(--cm-foreground)' },
  '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
  '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

  '.cm-searchMatch': {
    backgroundColor: 'var(--cm-background)',
    outline: '1px solid #457dff',
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: 'var(--cm-selection-background)',
  },

  '.cm-activeLine': { backgroundColor: 'var(--cm-line-highlight-background)' },
  '.cm-selectionMatch': { backgroundColor: 'var(--cm-selection-background)' },

  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: 'transparent',
    outline: '1px solid var(--cm-selection-background)',
  },

  '.cm-gutters': {
    backgroundColor: 'var(--cm-background)',
    color: 'var(--cm-line-number)',
    border: 'none',
    fontSize: 'var(--cm-font-size)',
    fontFamily: 'var(--cm-font-family)',
    width: '42px',
  },

  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: 'var(--cm-line-number-gutter)',
  },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ddd',
  },

  '.cm-tooltip': {
    border: 'none',
    backgroundColor: 'var(--cm-background)',
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: 'var(--cm-background)',
    borderBottomColor: 'var(--cm-background)',
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: 'var(--cm-line-highlight-background)',
      color: 'var(--cm-foreground)',
    },
  },
}, { dark: true })

/// The highlighting style for code in the One Dark theme.
export const oneDarkHighlightStyle = HighlightStyle.define([
  {
    tag: t.comment,
    color: 'var(--cm-comment)',
  },
  {
    tag: t.string,
    color: 'var(--cm-string)',
  },
  {
    tag: t.literal,
    color: 'var(--cm-literal)',
  },
  {
    tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: 'var(--cm-keyword)',
  },
  {
    tag: t.bool,
    color: 'var(--cm-boolean)',
  },
  {
    tag: t.number,
    color: 'var(--cm-number)',
  },
  {
    tag: t.variableName,
    color: 'var(--cm-variable)',
  },
  {
    tag: [t.function(t.variableName), t.labelName],
    color: 'var(--cm-function)',
  },
  {
    tag: t.deleted,
    color: 'var(--cm-deleted)',
  },
  {
    tag: t.className,
    color: 'var(--cm-class)',
  },
  {
    tag: t.propertyName,
    color: 'var(--cm-property)',
  },
  {
    tag: t.regexp,
    color: 'var(--cm-regex)',
  },
  // {
  //   tag: t.keyword,
  //   color: 'var(--cm-keyword)',
  // },
  // {
  //   tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
  //   color: 'var(--cm-name)',
  // },
  // {
  //   tag: [t.function(t.variableName), t.labelName],
  //   color: 'var(--cm-variable)',
  // },
  // {
  //   tag: [t.color, t.constant(t.name), t.standard(t.name)],
  //   color: 'var(--cm-constant)',
  // },
  // {
  //   tag: [t.definition(t.name), t.separator],
  //   color: 'var(--cm-definition)',
  // },
  // {
  //   tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
  //   color: 'var(--cm-keyword)',
  // },
  {
    tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
    color: 'var(--cm-operator)',
  },
  // {
  //   tag: [t.meta, t.comment],
  //   color: 'var(--cm-comment)',
  // },
  // {
  //   tag: t.strong,
  //   fontWeight: 'bold',
  // },
  // {
  //   tag: t.emphasis,
  //   fontStyle: 'italic',
  // },
  // {
  //   tag: t.strikethrough,
  //   textDecoration: 'line-through',
  // },
  // {
  //   tag: t.link,
  //   color: stone,
  //   textDecoration: 'underline',
  // },
  // {
  //   tag: t.heading,
  //   fontWeight: 'bold',
  //   color: coral,
  // },
  // {
  //   tag: [t.atom, t.bool, t.special(t.variableName)],
  //   color: 'var(--cm-boolean)',
  // },
  // {
  //   tag: [t.processingInstruction, t.string, t.inserted],
  //   color: 'var(--cm-string)',
  // },
  // {
  //   tag: t.invalid,
  //   color: 'var(--cm-invalid)',
  // },
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const varsTheme: Extension = [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle)]
