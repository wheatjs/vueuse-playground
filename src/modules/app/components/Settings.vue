<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { appSettings, useAppStore } from '..'

const filter = ref('')
const app = useAppStore()
const selectedTab = ref('General')

const filtered = computed(() => {
  if (filter.value === '')
    return appSettings.value[selectedTab.value]

  return appSettings.value[selectedTab.value].filter((item) => {
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
        px-2
        py-4
      >
        <RadioGroup v-model="selectedTab">
          <RadioGroupOption
            v-for="option in Object.keys(appSettings)"
            :key="option"
            v-slot="{ checked }"
            :value="option"
          >
            <Item
              :selected="checked"
              px-2
              h-10
              cursor-pointer
            >
              {{ option }}
            </Item>
          </RadioGroupOption>
        </RadioGroup>
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
          <Textfield
            v-model="filter"
            placeholder="Search Settings"
            w-full
          >
            <template #icon>
              <div i-carbon-search />
            </template>
          </Textfield>
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
      <Button @click="app.settingsOpen = false">
        Close
      </Button>
    </div>
  </Dialog>
</template>
