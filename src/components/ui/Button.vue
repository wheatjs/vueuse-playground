<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{ href?: string; primary?: boolean }>()
const type = computed(() => props.href ? 'a' : 'button')
</script>

<template>
  <button
    outline="focus:none"
    text="sm"
    p="x-4 y-2"
    flex="~"
    items="center"
    space="x-1"
    h="10"
    font="medium"
    border="rounded"
    :class="{ '!bg-green-500 !text-green-900': primary }"
    bg="light-700 dark:dark-400 hover:dark:dark-700"
  >
    <slot />
  </button>
</template>
