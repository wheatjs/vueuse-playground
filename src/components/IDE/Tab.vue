<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  name: string
}>()
</script>

<template>
  <div class="px-4 py-2 text-sm h-10 inline-flex flex-row items-center space-x-2 border-r dark:border-dark-900">
    <logos-vue />
    <div class="dark:text-light-900 light:text-dark-900">
      <slot />
    </div>
    <carbon-close v-if="name !== 'App.vue'" class="" />
  </div>
</template>
