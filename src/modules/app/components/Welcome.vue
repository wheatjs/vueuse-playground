<script setup lang="ts">
import { useAppStore } from '../store'
import presets from '~/../presets'
import { useProjectStore } from '~/modules/project'

const app = useAppStore()
const project = useProjectStore()
const preset = ref('default')

const loadPreset = () => {
  const p = presets.find(p => p.name === preset.value)
  console.log(p)
  if (p) {
    project.importProject(p)
    app.welcomeOpen = false
  }
}
</script>

<template>
  <Dialog
    v-model="app.welcomeOpen"
    max-w-250
    max-h-150
    h-full
  >
    <div
      w-full
      font-sans
      h-full grid grid-cols-5
    >
      <div
        col-span-2
        h-full
        grid place-content-center place-items-center
        border="r-1 dark:dark-900 light-900"
      >
        <Logo w-50 />
        <div
          mb-5
          mt="-2"
          text="center dark:light-900/90 dark-50"
          flex flex-col
        >
          <span text-5xl>VueUse</span>
          <span
            text-2xl
            mt="-1"
          >Playground</span>
        </div>
        <Checkbox v-model="app.showWelcome">
          Show Welcome on Startup
        </Checkbox>

        <div
          flex
          flex-row
          mt-5
          space-x-2
        >
          <Button>
            Sign In
          </Button>
          <Button @click="app.welcomeOpen = false">
            Close
          </Button>
        </div>
      </div>
      <div
        col-span-3
        flex flex-col
        pb-4
      >
        <div
          p-4
          flex-1
        >
          <div
            dark:bg-dark-800
            bg-light-600
            border-1
            dark:border-dark-900
            border-light-900
            rounded
            p-4
            py-2
            h-full
          >
            <div
              mb-2
              op50 text-sm font-sans
            >
              Templates
            </div>
            <Templates
              v-model="preset"
              :presets="presets"
            />
          </div>
        </div>
        <div
          px-4
          flex flex-row
        >
          <span flex-1 />
          <Button @click="loadPreset">
            Create
          </Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>
