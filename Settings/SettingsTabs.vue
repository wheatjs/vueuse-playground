<script setup lang="ts">
import { inject, provide, ref } from 'vue'
const tabs = ref([])
const activeTab = ref('')
provide('tabs', tabs)
provide('activeTab', activeTab)

const closeSettings = inject<() => void>('closeSettings');
</script>

<template>
  <div class="border-r border-light-900 flex flex-col dark:(border-black bg-dark-900 bg-opacity-80) bg-light-300 bg-opacity-75">
    <div class="text-left px-4 py-4 flex flex-row items-center space-x-2 bg-light-400 dark:bg-dark-900">
      Settings
      <span class="flex-1"></span>
      <button @click="closeSettings" class="hover:bg-gray-200 dark:hover:bg-dark-100 w-6 h-6 text-sm rounded-full flex place-items-center place-content-center">
        <carbon-close />
      </button>
    </div>
    <button
      v-for="tab in tabs"
      :key="tab"
      :class="{ 'text-green-500': activeTab === tab }"
      class="focus:outline-none text-left px-4 py-2 text-md flex flex-row items-center space-x-2"
      @click="activeTab = tab"
    >
      <ph-package v-if="tab === 'Packages'" />
      <carbon-code v-if="tab === 'Editor'" />
      <grommet-icons-install v-if="tab === 'Installed'" />
      <span>
        {{ tab }}
      </span>
    </button>
  </div>
  <div class="dark:(bg-dark-800) bg-light-300">
    <slot />
  </div>
</template>
