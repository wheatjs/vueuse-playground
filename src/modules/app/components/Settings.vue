<script setup lang="ts">
import { appSettings, useAppStore } from '..'

const filter = ref('')
const app = useAppStore()
const selected = ref('General')

const filtered = computed(() => {
  if (filter.value === '')
    return appSettings.value[selected.value]

  return appSettings.value[selected.value].filter((item) => {
    return item.name.toLowerCase().includes(filter.value.toLowerCase())
  })
})
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
        p-4
      >
        <button
          v-for="group in Object.keys(appSettings)"
          :key="group"
          :class="{
            'bg-green-500 !text-green-900 !border-green-400 font-bold': selected === group,
          }"
          text="hover:(green-500)"
          rounded
          border="1 transparent"
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
        h-full
        flex
        flex-col
        overflow-hidden
      >
        <div
          px-4
          py-4
          border="b-1 dark:dark-900 light-900"
        >
          <div
            flex
            flex-row
            items-center
            bg="dark:dark-800"
            rounded
            border="1 dark:dark-900 light-900 focus-within:green-500"
            pl-2
          >
            <div i-carbon-search />
            <input
              v-model="filter"
              h-8
              px-2
              w-full
              bg-transparent
              border-0
              outline="focus:none"
              type="text" placeholder="Search Settings"
            >
          </div>
        </div>
        <div
          flex-1
          overflow-auto
        >
          <AppSetting
            v-for="setting in filtered"
            :key="setting.name"
            v-model="setting.value"
            :name="setting.name"
            :type="setting.type"
            :description="setting.description"
            :enum-values="setting.enum"
            :enum-descriptions="setting.enumDescriptions"
          />
        </div>
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
