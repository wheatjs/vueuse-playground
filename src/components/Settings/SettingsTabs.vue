<script setup lang="ts">
import { provide, ref } from 'vue'
const tabs = ref([])
const activeTab = ref('')
provide('tabs', tabs)
provide('activeTab', activeTab)
</script>

<template>
  <div class="border-r border-light-900 dark:border-black flex flex-col dark:(bg-dark-900 bg-opacity-60) bg-light-200 bg-opacity-10">
    <div class="text-left px-4 py-4 flex flex-row items-center space-x-2 bg-light-400 dark:bg-dark-900">
      Settings
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