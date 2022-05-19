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
    <div v-if="editor.codeEditor === 'monaco'" h-full>
      <MonacoEditor

        :document="document"
        :file="file"
      />
    </div>
    <div v-else w-full h-full>
      <CodeMirrorEditor

        :document="document"
        :file="file"
      />
    </div>
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
