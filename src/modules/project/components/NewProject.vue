<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { useProjectStore } from '~/modules/project'
import presets from '~/../presets'

const preset = ref('Default')
const project = useProjectStore()

const featured = computed(() => presets.filter(p => p.featured))

const create = () => {
  const p = presets.find(p => p.name === preset.value)

  if (p) {
    project.importProject(p)
    project.isNewProjectDialogOpen = false
  }
}
</script>

<template>
  <Dialog
    v-model="project.isNewProjectDialogOpen"
    max-w-250
    max-h-150
    h-full
    flex flex-col
  >
    <div p-8>
      <span mb-2 block>Popular Templates</span>
      <div grid grid-cols-3 gap-4>
        <Item
          v-for="p in featured"
          :key="p.name"
          bg="dark:dark-800"
          border="1 dark:dark-900"
          py-4
        >
          <template #icon>
            <div w-18 h-18 :class="p.icon" />
          </template>
          <span text-xl block mb-0>
            {{ p.name }}
          </span>
          <template #subtitle>
            <span op50 text-xs>
              {{ Object.keys(p.packages).join(', ') }}
            </span>
            <span block text-base leading-5>
              {{ p.description }}
            </span>
          </template>
        </Item>
      </div>
    </div>

    <div flex-1 px-8 grid grid-cols-3 overflow-hidden>
      <DemoSelector />
    </div>

    <div
      flex
      flex-row
      p-4
      space-x-2
      justify-end
    >
      <Button>Cancel</Button>
      <Button
        primary
        @click="create"
      >
        Create
      </Button>
    </div>
  </Dialog>
</template>
