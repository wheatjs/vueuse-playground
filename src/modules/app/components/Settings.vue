<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { appSettings, useAppStore } from '..'

const filter = ref('')
const app = useAppStore()

const filtered = (tab: string) => {
  if (filter.value === '')
    return appSettings.value[tab]

  return appSettings.value[tab].filter((item) => {
    return item.name.toLowerCase().includes(filter.value.toLowerCase())
  })
}
</script>

<template>
  <Dialog
    v-model="app.settingsOpen"
    w-full h-full
    grid grid-cols="[minmax(256px,3fr)_5fr]"
    bg="dark:dark-400 light-500"
    overflow-hidden
  >
    <TabGroup vertical>
      <div
        bg="dark:dark-700 light-800"
        overflow-auto
        flex flex-col
        items-end
        py-16
        px-8
      >
        <TabList
          flex
          flex-col
          max-w-48
          w-full
        >
          <div
            text-xs
            font-medium font-sans
            uppercase
            mb-2
            px-2
          >
            Settings
          </div>
          <Tab
            v-for="tab in Object.keys(appSettings)"
            :key="tab"
            v-slot="{ selected }"
            outline="focus:none"
          >
            <div
              text-left
              h-9
              px-2
              rounded
              font-sans
              flex flex-row items-center
              :class="{
                '!bg-green-500/8 dark:!text-green-500 !text-green-600 font-medium': selected,
              }"
            >
              {{ tab }}
            </div>
          </Tab>
        </TabList>
      </div>
      <div
        py-16
        px-8
        h-full
        overflow-auto
      >
        <TabPanels>
          <TabPanel
            v-for="(settings, name) in appSettings"
            :key="name"
          >
            <div max-w-200>
              <div
                text-3xl
                flex flex-row
                items-center
              >
                <span flex-1>
                  {{ name }}
                </span>
                <IconButton @click="app.settingsOpen = false">
                  <i
                    i-carbon-close
                    text-3xl
                  />
                </IconButton>
              </div>

              <div mt-4>
                <Textfield
                  v-model="filter"
                  w-full
                  placeholder="Search Settings..."
                  h="!10"
                  mb-4
                >
                  <template #icon>
                    <i
                      i-carbon-search
                      text-lg
                    />
                  </template>
                </Textfield>
                <div>
                  <AppSetting
                    v-for="setting in filtered(name)"
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
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  </Dialog>
</template>

<!-- <template>
  <Dialog
    v-model="app.settingsOpen"
    max-w-250
    max-h-170
    h-full
    flex flex-col
    overflow-hidden
  >
    <div
      h-10
      border="b-1 dark:dark-900 light-900"
      flex flex-row
      items-center
      pl-2
    >
      <div
        flex
        flex-row flex-1
        items-center
      >
        <i
          op50
          mr-1
          i-carbon-settings
        />
        <span>Settings</span>
      </div>

      <IconButton>
        <i i-carbon-close />
      </IconButton>
    </div>
    <div
      flex-1
      overflow-hidden
      grid
      lg="grid-cols-[250px_1fr]"
    >
      <div
        border="r-1 dark:dark-900 light-900"
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
              rounded="!none"
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
          border="b-1 dark:dark-900 light-900"
        >
          <Textfield
            v-model="filter"
            b-0
            rounded="!none"
            placeholder="Search Settings"
            w-full
            h="!10"
          >
            <template #icon>
              <div i-carbon-search />
            </template>
          </Textfield>
        </div>
        <div
          flex-1
          overflow-auto
          bg-dark-800
          text-sm
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
  </Dialog>
</template> -->
