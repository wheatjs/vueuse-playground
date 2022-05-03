<script setup lang="ts">
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
</template>
