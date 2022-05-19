import type { editor as Editor } from 'monaco-editor'
import type { Ref } from 'vue'
import type { Fn, MaybeRef } from '@vueuse/core'
import config from '@playground/config'
import type { IDisposable } from 'xterm'
import { useAppStore } from '../../app'
import { useEditorStore } from '../store'
import { Plugins, createMonacoInstance } from '~/modules/editor/monaco'
import type { Document } from '~/modules/project'

export interface UseMonacoOptions {
  document: Ref<Document>
  readOnly: MaybeRef<boolean>
}

/**
 * Hooks into document onDidChangeContent event and keeps models that are not
 * updated from the editor in sync.
 *
 * Example: uno.css is a generated document and needs to be updated when new content
 * is generated.
 */
const modelWatchers: Record<string, Fn> = {}

export function useMonacoEditor(target: Ref<HTMLElement | undefined>, options: UseMonacoOptions) {
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

  const init = async () => {
    const el = unref(target)
    const { monaco } = await createMonacoInstance()

    if (!monaco || !el)
      return

    const model = computed(() => {
      if (monaco.editor.getModel(monaco.Uri.file(options.document.value.name)))
        return monaco.editor.getModel(monaco.Uri.file(options.document.value.name))
      return monaco.editor.createModel(options.document.value.toString(), options.document.value.language, monaco.Uri.file(options.document.value.name))
    })

    watch(model, () => {
      const uri = model.value?.uri.toString()
      if (uri && !modelWatchers[uri]) {
        modelWatchers[uri] = options.document.value.onDidChangeContent((source) => {
          if (source !== 'editor')
            model.value?.setValue(options.document.value.toString())
        }).off
      }

      if (options.document.value.toString() !== model.value?.getValue())
        model.value?.setValue(options.document.value.toString())
    }, { immediate: true })

    let dispose: Fn[] = []
    watch(options.document, () => {
      dispose.forEach(d => d())

      dispose = [
        /**
         * When the document is deleted, clean up any watchers and delete the model from monaco
         * so it can be used later on without any stale content.
         *
         * Remove any watches when the document is deleted.
         */
        options.document.value.onDocumentDisposed((filename) => {
          const uri = monaco.Uri.file(filename)

          if (modelWatchers[uri.toString()]) {
            modelWatchers[uri.toString()]()
            delete modelWatchers[uri.toString()]
          }

          if (monaco.editor.getModel(uri))
            monaco.editor.getModel(uri)!.dispose()
        }).off,
      ]

      /**
       * Set the model of the current editor to the model of the document.
       */
      if (model.value && editor)
        editor.setModel(model.value)
    }, { flush: 'post' })

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
      model: unref(model),
      wordWrap: editorWordWrap.value,
    })

    editor.onDidChangeCursorPosition(() => {
      currentEditorLine.value = editor.getPosition()?.lineNumber ?? 0
      currentEditorColumn.value = editor.getPosition()?.column ?? 0
    })

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
        options.document.value.setValue(model.getValue(), 'editor')

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
