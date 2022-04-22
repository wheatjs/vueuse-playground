<script setup lang="ts">
import { appSettings, useAppStore } from '.'

const app = useAppStore()
const selected = ref('General')
</script>

<template>
  <Dialog
    v-model="app.settingsOpen"
    max-w-250
    max-h-170
    h-full
    flex flex-col
    overflow-hidden
  >
    <div
      flex-1
      overflow-hidden
      grid grid-cols="[250px_auto]"
    >
      <div
        border="r-1 dark:dark-900 light-900"
        py-2
      >
        <button
          v-for="group in Object.keys(appSettings)"
          :key="group"
          :class="{
            'bg-green-500 !text-green-900': selected === group,
          }"
          text="hover:(green-500)"
          font-mono
          text-sm
          text-left
          px-4
          h-8
          w-full
          @click="selected = group"
        >
          {{ group }}
        </button>
      </div>
      <div
        py-2
        h-full
        overflow-auto
      >
        <AppSetting
          v-for="setting in appSettings[selected]"
          :key="setting.name"
          :setting="setting"
        />
      </div>
    </div>
    <div
      py-2 px-4
      flex
      flex-row justify-end
      border="t-1 dark:dark-900 light-900"
    >
      <Button
        bg="dark:dark-900 light-900"
        @click="app.settingsOpen = false"
      >
        Close
      </Button>
    </div>
  </Dialog>
</template>
