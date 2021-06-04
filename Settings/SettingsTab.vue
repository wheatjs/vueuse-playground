<script setup lang="ts">
import { inject, defineProps, onMounted } from 'vue'
import type { Ref } from 'vue'
const props = defineProps<{ name: string; active?: boolean }>()
const activeTab = inject<any>('activeTab')
const tabs = inject<Ref<string[]>>('tabs')
if (tabs && tabs.value)
  tabs.value = [...tabs.value, props.name]
onMounted(() => {
  if (props.active)
    activeTab.value = props.name
})
</script>

<template>
  <div v-show="activeTab === name">
    <slot />
  </div>
</template>
