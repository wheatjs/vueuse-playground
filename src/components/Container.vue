<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ title: string; noOverflow?: boolean; noRounding?: boolean }>()
</script>

<template>
  <div class="h-full grid grid-rows-[min-content,auto]">
    <div class="text-xs bg-light-500 dark:text-light-900 dark:bg-dark-800 p-2 text-opacity-75 font-bold" :class="noRounding ? '' : 'rounded-t-md'">
      {{ title }}
    </div>
    <div class="dark:bg-dark-800 bg-light-300 rounded-b-md w-full" :class="noOverflow ? 'overflow-hidden' : 'overflow-auto'">
      <slot />
    </div>
  </div>
</template>
