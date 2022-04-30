<script setup lang="ts">
import { coreCategoryNames, functions } from '@vueuse/metadata'
// import VueUseDemos from '~/../demos'

const filter = ref('')
// const packages = computed(() => [...new Set(VueUseDemos.map(x => x.package))])
const functionsInCategory = (category: string) => {
  return functions.filter(x => x.category === category)
}
</script>

<template>
  <div
    h-full flex flex-col overflow-hidden
    font-sans
    text-sm
  >
    <span mb-2 block>Demos</span>
    <div
      bg="dark:dark-800" border="1 dark:dark-900" rounded flex-1 overflow-hidden
      flex flex-col
    >
      <Textfield
        v-model="filter" w-full b-t-0 b-r-0 b-l-0
        rounded-b-0 placeholder="Search..."
      >
        <template #icon>
          <div i-carbon-search />
        </template>
      </Textfield>
      <div flex-1 overflow-auto>
        <div v-for="category in coreCategoryNames" :key="category">
          <div p-2 font-medium op80>
            {{ category }}
          </div>
          <div v-for="func in functionsInCategory(category)" :key="func.name" px-2 py-1>
            <FunctionBadge :fn="func" />
            <!-- {{ func.name }} -->
          </div>
        </div>
      </div>

      <!-- {{ coreCategoryNames }} -->
      <!-- <div v-for="pkg in packages">
        <div p-2 op80 text-tsm>
          @{{ pkg }}
        </div>
        <div>Stuff</div>
      </div> -->
      <!-- <div v-for="demo of VueUseDemos">
        {{ demo.name }}
      </div> -->
    </div>
  </div>
</template>
