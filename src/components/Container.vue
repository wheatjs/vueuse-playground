<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ title: string }>()
</script>

<template>
  <div class="h-full grid grid-rows-[min-content,auto]">
    <div class="text-xs text-light-900 bg-dark-800 rounded-t-md p-2 text-opacity-75 font-bold">
      {{title}}
    </div>
    <div class="bg-dark-800 rounded-b-md w-full overflow-hidden">
      <slot />
    </div>
  </div>
</template>
