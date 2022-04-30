<script setup lang="ts">
import { coreCategoryNames, functions } from '@vueuse/metadata'
import { useProjectStore } from '~/modules/project'

const filter = ref('')
const project = useProjectStore()

const filteredFunctions = computed(() => {
  const value = filter.value
  if (!value)
    return functions

  return functions.filter(({ name }) => name.includes(value))
})
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
      <div border="b-1 dark:dark-900" p-4>
        <Textfield v-model="filter" placeholder="Search..." w-full>
          <template #icon>
            <i i-carbon-search />
          </template>
        </Textfield>
      </div>
      <div overflow-auto space-y-6 p-4 flex-1>
        <div v-for="category in coreCategoryNames" :key="category">
          <div tracking-wide font-sans mb-2>
            {{ category }}
          </div>
          <div flex flex-row flex-wrap gap-2>
            <FunctionBadge
              v-for="fn in filteredFunctions.filter(x => x.category === category)"
              :key="fn.name"
              :fn="fn"
              op="hover:100 50"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      p-4 flex flex-row justify-end space-x-2
      border="t-1 dark:dark-900"
    >
      <Button>
        Cancel
      </Button>
      <Button primary>
        Open Demo
      </Button>
    </div>
  </Dialog>
</template>
