<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { store } from '~/store'

const props = defineProps<{
  buildStatus?: string
  createdAt?: string
  description: string
  hasTypes?: boolean
  isDeprecated?: boolean
  name: string
  popularityScor?: number
  projectType?: string
  updatedAt?: string
  maintainers?: { name: string; email: string }[]
}>()

const isInstalled = computed(() => store.packages.find(({ name }) => name === props.name))

const install = () => {
  if (!isInstalled.value) {
    store.packages = [
      ...store.packages,
      {
        name: props.name,
        description: props.description,
        url: `https://cdn.skypack.dev/${props.name}`,
      },
    ]
  }
}
</script>

<template>
  <div class="flex px-4 py-2 hover:bg-light-700 dark:hover:bg-dark-700 flex flex-row items-center">
    <div class="flex flex-col flex-1">
      <span>{{ name }}</span>
      <span class="text-dark-100 dark:text-light-900 text-opacity-70 text-sm">{{ description }}</span>
    </div>
    <button
      :class="{ '!bg-green-500 !text-green-900': isInstalled }"
      class="bg-light-900 dark:bg-dark-900 px-4 py-1 dark:text-light-900 text-opacity-75 rounded"
      @click="install"
    >
      {{ isInstalled ? 'Installed' : 'Install' }}
    </button>
  </div>
</template>
