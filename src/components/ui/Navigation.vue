<script setup lang="ts">
import { defineProps } from 'vue'
import { useVModel, useClipboard } from '@vueuse/core'
import { isDark, toggleDark } from '~/logic/dark'
// import { exportState } from '~/store'

const props = defineProps<{ modelValue: boolean }>()
const isOpen = useVModel(props)
const { copy } = useClipboard()

// const copyToClipboard = () => {
//   copy(`${location.host}/#${exportState()}`)
// }
</script>

<template>
  <div class="fixed left-0 top-0 bottom-0 py-4 px-2 w-14 m-r-2 flex flex-col items-center space-y-2">
    <!-- <logos-vue class="text-4xl"/> -->
    <img src="/vueuse.svg" class="w-12" />
    <span class="flex-1"></span>
    <IconButton @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </IconButton>
    <!-- <IconButton @click="copyToClipboard">
      <carbon-share class="text-xl" />
    </IconButton> -->
    <IconButton @click="isOpen = true">
      <carbon-settings class="text-xl" />
    </IconButton>
    <a href="https://github.com/wheatjs/vueuse-playground" target="_blank">
      <IconButton>
        <mdi-github class="text-xl" />
      </IconButton>
    </a>
  </div>
</template>
