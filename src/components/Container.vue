<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ title: string }>()
</script>

<template>
  <div class="h-full grid grid-rows-[min-content,auto]">
    <div class="text-xs bg-light-500 dark:text-light-900 dark:bg-dark-800 rounded-t-md p-2 text-opacity-75 font-bold">
      {{title}}
    </div>
    <div class="dark:bg-dark-800 bg-light-300 rounded-b-md w-full overflow-hidden">
      <slot />
    </div>
  </div>
</template>
