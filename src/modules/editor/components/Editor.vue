<script setup lang="ts">
import type { editor as Editor } from 'monaco-editor'
import { useEditor } from '../useEditor'

const props = defineProps<{ model: Editor.ITextModel }>()
const editor = ref<HTMLElement>()
const { model } = toRefs(props)

useEditor(editor, { model })
</script>

<template>
  <div
    ref="editor"
    h-full
  />
</template>
