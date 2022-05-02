<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { coreCategoryNames, functions } from '@vueuse/metadata'
import { useRouter } from 'vue-router'
import { useProjectStore } from '~/modules/project'
import Demos from '~/../demos'

const baseFunctions = functions.filter(({ name }) => Demos.some(({ name: n }) => n === name))

const { push } = useRouter()
const filter = ref('')
const project = useProjectStore()
const demo = ref('')

const filteredFunctions = computed(() => {
  const value = filter.value
  if (!value)
    return baseFunctions

  return baseFunctions.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))
})

const open = () => {
  push(`/demo/${demo.value}`)
  project.isOpenDemoDialogOpen = false
}
</script>

<template>
  <Dialog
    v-model="project.isOpenDemoDialogOpen"
    max-w-200
    lg:max-h-150
    h-full
    grid
    overflow-hidden
    font-sans
    flex flex-col
  >
    <div flex-1 overflow-hidden flex flex-col>
      <div border="b-1 dark:dark-900 light-900" p-4>
        <Textfield v-model="filter" placeholder="Search..." w-full>
          <template #icon>
            <i i-carbon-search />
          </template>
        </Textfield>
      </div>
      <div overflow-auto space-y-6 p-4 flex-1>
        <RadioGroup v-model="demo">
          <div v-for="category in coreCategoryNames" :key="category" mb-4>
            <div v-if="filteredFunctions.filter(x => x.category === category).length > 0" tracking-wide font-sans mb-2>
              {{ category }}
            </div>
            <div flex flex-row flex-wrap gap-2>
              <RadioGroupOption
                v-for="fn in filteredFunctions.filter(x => x.category === category)"
                :key="fn.name"
                v-slot="{ checked }"
                :value="fn.name"
              >
                <FunctionBadge
                  :class="{ 'ring-2 ring-green-500': checked }"
                  :fn="fn"
                  active="outline-0"
                  ring="active:(green-500)"
                  class="text-green-500"
                />
              </RadioGroupOption>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
    <div
      p-4 flex flex-row justify-end space-x-2
      border="t-1 dark:dark-900 light-900"
    >
      <Button>
        Cancel
      </Button>
      <Button primary @click="open">
        Open Demo
      </Button>
    </div>
  </Dialog>
</template>
