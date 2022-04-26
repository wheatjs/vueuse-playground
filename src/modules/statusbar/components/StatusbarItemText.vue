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
    <Spinner
      v-if="item.isLoading"
      ml-1
      h-4
      w-4
    />
    <span>{{ item.text }}</span>
  </div>
</template>
