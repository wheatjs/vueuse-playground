<script setup lang="ts">
import { defineProps } from 'vue'
import { store } from '~/store'

const props = defineProps<{
  name: string
  description: string
}>()

const uninstall = () => {
  store.packages = store.packages.filter(({ name }) => name !== props.name)
}
</script>

<template>
  <div class="flex px-4 py-2 hover:bg-light-700 hover:dark:bg-dark-700 flex flex-row items-center">
    <div class="flex flex-col flex-1">
      <span>{{ name }}</span>
      <span class="text-dark-100 dark:text-light-900 text-opacity-70 text-sm">{{ description }}</span>
    </div>
    <button class="bg-light-900 dark:bg-dark-900 px-4 py-1 dark:text-light-900 text-opacity-75 rounded" @click="uninstall">
      Uninstall
    </button>
  </div>
</template>
