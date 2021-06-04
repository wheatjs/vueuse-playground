<script setup lang="ts">
import { defineProps } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
  placeholder: string
}>()

const value = useVModel(props)
</script>

<template>
  <div border="~ rounded dark:dark-900" h="12" flex="~ 1" items="center" bg="light-400 dark:dark-800">
    <div flex="~" place="items-center content-center" bg="light-700 dark:dark-900" h="full" w="12">
      <carbon-search text="dark:(light-900 opacity-75)" />
    </div>
    <input
      v-model="value"
      type="text"
      h="full"
      outline="focus:none"
      bg="transparent"
      flex="1"
      p="x-4"
      :placeholder="placeholder"
    >
  </div>
</template>
