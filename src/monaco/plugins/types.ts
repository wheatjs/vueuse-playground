import type { CompletionItem, TextDocument, HTMLDocument, Position } from 'vscode-html-languageservice'

export interface HTMLPluginCompletion {
  position: Position
  document: TextDocument
  html: HTMLDocument
}

export interface HTMLPlugin {
  completions(options: HTMLPluginCompletion): CompletionItem[]
}
