<script setup lang="ts">
import { usePreviewStore } from '..'

const preview = usePreviewStore()
</script>

<template>
  <div
    flex
    flex-row h-full
    border="x-1 dark:dark-900 light-900"
    divide="x-1 dark:dark-900 light-900"
  >
    <Listbox>
      <template #label>
        Default
      </template>
      <ListboxOption>First Option</ListboxOption>
      <ListboxOption>SEcond Option</ListboxOption>
    </Listbox>
    <button
      bg="hover:(dark:dark-400 light-900)"
      w-8
      flex flex-row place-content-center place-items-center
      @click="preview.isMaximized = !preview.isMaximized"
    >
      <div
        i-carbon-maximize
        w-4 h-4
      />
    </button>
  </div>
</template>
