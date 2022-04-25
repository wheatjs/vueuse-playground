<script setup lang="ts">
import { usePreview, usePreviewStore } from '..'

const preview = usePreviewStore()
const target = ref<HTMLElement>()
usePreview(target)

</script>

<template>
  <div
    :class="{
      'fixed inset-0 z-90000000': preview.isMaximized,
    }"
  >
    <button
      v-if="preview.isMaximized"
      bg="hover:(dark:dark-400 light-900)"
      absolute
      right-4
      top-4
      w-7
      h-7
      rounded-full
      flex flex-row place-content-center place-items-center
      @click="preview.isMaximized = !preview.isMaximized"
    >
      <div
        i-carbon-minimize
        w-4 h-4
      />
    </button>
    <div
      ref="target"
      w-full h-full class="preview-container"
    />
  </div>
</template>

<style>
.preview-container iframe {
  @apply w-full h-full bg-transparent;
}
</style>
