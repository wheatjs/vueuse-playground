<script setup lang="ts">
import { useEditorStore } from '~/modules/editor'
import type { BaseFile, Document } from '~/modules/project'

defineProps<{
  file: BaseFile
  document: Document
}>()

const MonacoEditor = defineAsyncComponent(() => import('~/modules/editor/monaco/MonacoEditor.vue'))
const CodeMirrorEditor = defineAsyncComponent(() => import('~/modules/editor/codemirror/CodeMirrorEditor.vue'))

const editor = useEditorStore()
</script>

<template>
  <div>
    <MonacoEditor
      v-if="editor.codeEditor === 'monaco'"
      :document="document"
      :file="file"
    />
    <CodeMirrorEditor
      v-else
      :document="document"
      :file="file"
    />
  </div>
</template>

<!-- <script setup lang="ts">
import type { editor as Editor } from 'monaco-editor'
import { useEditor } from '../useEditor'

const props = defineProps<{ model: Editor.ITextModel; readOnly: boolean }>()
const editor = ref<HTMLElement>()
const { model, readOnly } = toRefs(props)

useEditor(editor, { model, readOnly })
</script>

<template>
  <div
    ref="editor"
    h-full
  />
</template> -->
