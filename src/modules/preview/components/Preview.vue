<script setup lang="ts">
import { usePreview } from '..'

const target = ref<HTMLElement>()
usePreview(target)
</script>

<template>
  <div
    ref="target"
    w-full h-full class="preview-container"
  />
</template>

<style>
.preview-container iframe {
  @apply w-full h-full bg-transparent;
}
</style>
