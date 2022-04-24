<script setup lang="ts">
import type { StatusbarItemText } from '..'

defineProps<{ item: StatusbarItemText }>()
</script>

<template>
  <div
    px-2
    h-full
    flex flex-row items-center
  >
    <span>{{ item.text }}</span>
  </div>
</template>
