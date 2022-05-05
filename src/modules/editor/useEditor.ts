import type { editor as Editor } from 'monaco-editor'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import config from '@playground/config'
import type { IDisposable } from 'xterm'
import { useAppStore } from '../app'
import { useEditorStore } from './store'
import { Plugins, createMonacoInstance } from '~/modules/editor/monaco'

const editorState: { index: number; editors: Editor.ICodeEditor[] } = {
  index: 0,
  editors: [],
}

export interface UseMonacoOptions {
  model: MaybeRef<Editor.ITextModel>
  readOnly: MaybeRef<boolean>
}

export function useEditor(target: Ref<HTMLElement | undefined>, options: UseMonacoOptions) {
  const app = useAppStore()
  const editorStore = useEditorStore()
  const {
    editorTabSize,
    editorInsertSpaces,
    editorWordWrap,
    editorFontFamily,
    editorFontSize,
    editorFontLigatures,
    editorAutoClosingBrackets,
    editorAutoClosingQuotes,

    currentEditorColumn,
    currentEditorLine,
  } = storeToRefs(editorStore)
  let editor: Editor.IStandaloneCodeEditor

  watch(options.model, () => {
    const model = unref(options.model)

    if (model && editor)
      editor.setModel(model)
      // if (model.getLanguageId() === 'html')
      //   editor.getAction('editor.action.formatDocument').run()
  })

  const init = async () => {
    const el = unref(target)
    const { monaco } = await createMonacoInstance()

    if (!monaco || !el)
      return

    editor = monaco.editor.create(el, {
      tabSize: editorTabSize.value,
      insertSpaces: editorInsertSpaces.value,
      autoClosingBrackets: editorAutoClosingBrackets.value,
      autoClosingQuotes: editorAutoClosingQuotes.value,
      folding: config.editor.folding,
      fontFamily: editorFontFamily.value,
      fontLigatures: editorFontLigatures.value,
      fontSize: editorFontSize.value,
      theme: app.isDark ? 'Dark' : 'Light',
      quickSuggestions: true,
      quickSuggestionsDelay: 0,
      minimap: config.editor.minimap,
      automaticLayout: true,
      linkedEditing: true,
      renameOnType: true,
      readOnly: unref(options.readOnly),
      bracketPairColorization: {
        enabled: true,
      },
      smoothScrolling: true,
      model: unref(options.model),
      wordWrap: editorWordWrap.value,
    })

    // if (unref(options.model) && unref(options.model).getLanguageId() === 'html')
    //   editor.getAction('editor.action.formatDocument').run()

    editorState.editors.push(editor)

    editor.onDidChangeCursorPosition(() => {
      currentEditorLine.value = editor.getPosition()?.lineNumber ?? 0
      currentEditorColumn.value = editor.getPosition()?.column ?? 0
    })
    // editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Tab, () => cycleEditor())

    let subscriptions: IDisposable[] = []

    const mountEditorPlugins = async () => {
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

  watch([
    editorTabSize,
    editorInsertSpaces,
    editorAutoClosingBrackets,
    editorAutoClosingQuotes,
    editorFontFamily,
    editorFontSize,
    editorWordWrap,
    options.readOnly,
    editorFontLigatures], () => {
    editor.updateOptions({
      insertSpaces: editorInsertSpaces.value,
      tabSize: editorTabSize.value,
      fontFamily: editorFontFamily.value,
      fontLigatures: editorFontLigatures.value,
      fontSize: editorFontSize.value,
      autoClosingBrackets: editorAutoClosingBrackets.value,
      autoClosingQuotes: editorAutoClosingQuotes.value,
      wordWrap: editorWordWrap.value,
      readOnly: unref(options.readOnly),
    })
  })

  watch(target, () => {
    const el = ref(target)

    if (el)
      init()
  })
}
