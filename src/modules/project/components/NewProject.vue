<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { useProjectStore } from '~/modules/project'
import presets from '~/../presets'

const preset = ref('Default')
const project = useProjectStore()

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
    max-w-125
    max-h-150
    h-full
    flex flex-col
  >
    <div
      flex-1
      px-4
      pt-4
      flex flex-col
    >
      <div
        flex flex-row items-center text-lg op80
        mb-2
      >
        <i
          i-carbon-template
          block
          mr-1
        />
        New from Template
      </div>
      <div
        flex-1
        bg="dark-800"
        rounded
        overflow-auto
        border="1 dark-900"
      >
        <RadioGroup v-model="preset">
          <RadioGroupOption
            v-for="p in presets"
            :key="p.name" v-slot="{ checked }"
            :value="p.name"
          >
            <Item
              :selected="checked"
              rounded-none
              px-4
              py-1
              cursor-pointer
            >
              {{ p.name }}
              <template #subtitle>
                {{ p.description }}
              </template>
            </Item>
          </RadioGroupOption>
        </RadioGroup>
      </div>
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
