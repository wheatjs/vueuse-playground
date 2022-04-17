import type { editor as Editor } from 'monaco-editor'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import config from '@playground/config'
import type { IDisposable } from 'xterm'
import { currentEditorColumn, currentEditorLine, editorTabSize } from './state'
import { Plugins, createMonacoInstance } from '~/monaco'
import { isDark } from '~/modules/shared'

const editorState: { index: number; editors: Editor.ICodeEditor[] } = {
  index: 0,
  editors: [],
}

export interface UseMonacoOptions {
  model: MaybeRef<Editor.ITextModel>
}

export function useEditor(target: Ref<HTMLElement | undefined>, options: UseMonacoOptions) {
  let editor: Editor.IStandaloneCodeEditor

  // const cycleEditor = () => {
  //   editorState.index = editorState.editors.length - 1 > editorState.index ? editorState.index + 1 : 0
  //   editorState.editors[editorState.index].focus()
  //   currentEditorLine.value = editorState.editors[editorState.index].getPosition()?.lineNumber ?? 0
  //   currentEditorColumn.value = editorState.editors[editorState.index].getPosition()?.column ?? 0
  // }

  watch(options.model, () => {
    const model = unref(options.model)

    if (model && editor)
      editor.setModel(model)
  })

  const init = async() => {
    const el = unref(target)
    const { monaco } = await createMonacoInstance()

    if (!monaco || !el)
      return

    editor = monaco.editor.create(el, {
      tabSize: editorTabSize.value,
      insertSpaces: config.editor.insertSpaces,
      autoClosingBrackets: config.editor.autoClosingBrackets,
      autoClosingQuotes: config.editor.autoClosingQuotes,
      folding: config.editor.folding,
      fontFamily: config.editor.fontFamily,
      fontLigatures: config.editor.fontLigatures,
      fontSize: config.editor.fontSize,
      theme: isDark.value ? 'Dark' : 'Light',
      quickSuggestions: true,
      quickSuggestionsDelay: 0,
      minimap: config.editor.minimap,
      automaticLayout: true,
      model: unref(options.model),
    })

    editorState.editors.push(editor)

    editor.onDidChangeCursorPosition(() => {
      currentEditorLine.value = editor.getPosition()?.lineNumber ?? 0
      currentEditorColumn.value = editor.getPosition()?.column ?? 0
    })
    // editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Tab, () => cycleEditor())

    let subscriptions: IDisposable[] = []

    const mountEditorPlugins = async() => {
      subscriptions.forEach(s => s.dispose())
      subscriptions = []

      const model = editor.getModel()

      if (!model)
        return

      const currentPlugins = Plugins.filter(p => p.language === model.getLanguageId())

      currentPlugins
        .forEach((p) => {
          if (p.init)
            p.init(editor)
        })

      subscriptions.push(model.onDidChangeContent(() => {
        currentPlugins.forEach((p) => {
          if (p.onContentChanged)
            p.onContentChanged(editor)
        })
      }))
    }

    editor.onDidChangeModel(mountEditorPlugins)
    mountEditorPlugins()
  }

  watch(editorTabSize, () => {
    editor.updateOptions({
      tabSize: editorTabSize.value,
    })
  })

  watch(target, () => {
    const el = ref(target)

    if (el)
      init()
  })
}
