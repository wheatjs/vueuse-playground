<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ title: string; noOverflow?: boolean; noRounding?: boolean }>()
</script>

<template>
  <div
    h="full"
    grid="~"
    border="1 light-900 dark:dark-400"
    shadow="lg"
    class="grid-rows-[min-content,auto]"
    :class="noRounding ? 'border-t-0' : 'rounded-md'"
  >
    <div
      text="xs"
      bg="light-500 dark:dark-800"
      p="2"
      :class="noRounding ? '' : 'rounded-t-md'"
    >
      {{ title }}
    </div>
    <div bg="dark:dark-800 light-300" border="rounded-b-md" w="full" :class="noOverflow ? 'overflow-hidden' : 'overflow-auto'">
      <slot />
    </div>
  </div>
</template>
