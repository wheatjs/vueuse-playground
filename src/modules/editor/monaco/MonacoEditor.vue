<script setup lang="ts">
import { useMonacoEditor } from './useMonacoEditor'
import type { BaseFile, Document } from '~/modules/project'

const props = defineProps<{
  file: BaseFile
  document: Document
}>()

const { document, file } = toRefs(props)
const target = ref<HTMLElement>()

useMonacoEditor(target, {
  readOnly: computed(() => file.value.readOnly),
  document,
})
</script>

<template>
  <div ref="target" h-full />
</template>
