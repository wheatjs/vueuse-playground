<script setup lang="ts">
import type { VueUseFunction } from '@vueuse/metadata'

defineProps<{ fn: VueUseFunction }>()
function styledName(name: string) {
  if (name.startsWith('use'))
    return `<span opacity="70">use</span>${name.slice(3)}`
  if (name.startsWith('try'))
    return `<span opacity="70">try</span>${name.slice(3)}`
  if (name.startsWith('on'))
    return `<span opacity="70">on</span>${name.slice(2)}`
  return name
}
</script>

<template>
  <div
    bg="gray-400/5" p="x-1.5 y-0.5" class="rounded items-center whitespace-nowrap overflow-hidden overflow-ellipsis" cursor-pointer text="sm"
  >
    <div flex="inline gap-1">
      <span v-html="styledName(fn.name)" />
    </div>
  </div>
</template>
