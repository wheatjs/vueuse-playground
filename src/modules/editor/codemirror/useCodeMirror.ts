import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup'
import { keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import type { CompletionSource } from '@codemirror/autocomplete'
import { CompletionContext, CompletionResult, autocompletion } from '@codemirror/autocomplete'
import type { Ref } from 'vue'
import type { Extension } from '@codemirror/state'
import type { LRLanguage } from '@codemirror/language'
import { varsTheme } from './themes/theme-vars'
import type { Document } from '~/modules/project'
import { extname } from '~/modules/shared'

export interface UseCodeMirrorOptions {
  document: Document
}

export function getLanguage(id: string): Promise<[Extension[], CompletionSource[]]> | undefined {
  return {
    js: import('@codemirror/lang-javascript').then(x => [[x.javascriptLanguage], []]),
    ts: import('@codemirror/lang-javascript').then(x => [[x.typescriptLanguage, x.autoCloseTags], []]),
    html: import('@codemirror/lang-html').then(x => [[x.htmlLanguage, x.autoCloseTags], [x.htmlCompletionSource]]),
    css: import('@codemirror/lang-css').then(x => [[x.cssLanguage], [x.cssCompletionSource]]),
    json: import('@codemirror/lang-json').then(x => [[x.jsonLanguage], []]),
  }[id] as unknown as any
}

export async function useCodeMirror(target: Ref<HTMLElement | undefined>, options: UseCodeMirrorOptions) {
  const ext = extname(options.document.name).substring(1)
  const languageFeatures = await getLanguage(ext)

  watch(target, () => {
    const el = unref(target)

    if (!el)
      return

    const state = EditorState.create({
      extensions: [
        basicSetup,
        ...languageFeatures![0],
        varsTheme,
        autocompletion({
          override: [
            ...languageFeatures![1],
          ],
        }),
        keymap.of([indentWithTab]),
        EditorView.updateListener.of((v) => {
          if (v.docChanged)
            options.document.setValue(v.state.doc.toString())
        }),
      ],
      doc: options.document.toString(),
    })

    const editor = new EditorView({
      state,
      parent: el,
    })
  }, { immediate: true })
}
