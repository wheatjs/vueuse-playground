<script setup lang="ts">
import { usePreview, usePreviewStore } from '..'
import { useProjectStore } from '~/modules/project'

const project = useProjectStore()
const preview = usePreviewStore()
const target = ref<HTMLElement>()
usePreview(target)
</script>

<template>
  <div
    relative
    :class="{
      '!fixed inset-0 !z-9002': preview.isMaximized,
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
    <div
      v-if="project.importStatus.installingPackages || project.importStatus.compiling" absolute inset-0 bg="dark:dark-800 light-100" grid
      place-items-center place-content-center gap-4
    >
      <Spinner />
      <div flex flex-row space-x-2 items-center text-lg>
        <div
          w-6 h-6 :class="{
            'i-raphael-package': project.importStatus.installingPackages,
            'i-carbon-tool-kit': project.importStatus.compiling,
          }"
        />
        <span v-if="project.importStatus.installingPackages">Installing Packages</span>
        <span v-if="project.importStatus.compiling">Compiling Project</span>
      </div>
    </div>
  </div>
</template>

<style>
.preview-container iframe {
  @apply w-full h-full bg-transparent;
}
</style>
