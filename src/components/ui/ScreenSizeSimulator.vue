<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { useVModel } from '@vueuse/core'
import sizes from '~/data/screen-sizes.json'

const props = defineProps<{
  modelValue: string
}>()

const value = useVModel(props)
</script>

<template>
  <Listbox v-model="value">
    <div position="relative">
      <ListboxButton
        outline="focus:none"
        flex="~"
        h="8"
        items="center"
        p="x-2"
        space="x-2"
        border="l-1 dark:dark-300"
        position="relative"
      >
        <carbon-devices />
        <span>
          {{ value }}
        </span>
        <carbon-chevron-down />
      </ListboxButton>
      <ListboxOptions
        position="absolute top-5 right-0"
        bg="dark:dark-900 light-300"
        shadow="~ lg"
        border="rounded-b rounded-tl"
        overflow="hidden"
        list="none"
        outline="focus:none"
        p="0"
        z="5000"
      >
        <ListboxOption v-for="(size, index) in sizes" v-slot="{ active, selected }" :key="index" :value="index">
          <div
            :class="{ 'bg-light-900 dark:bg-dark-400': active, 'bg-light-900 dark:bg-dark-400': selected }"
            p="x-4 y-2"
            cursor="pointer"
            bg="hover:(dark:dark-500 light-800)"
            class="whitespace-nowrap"
            flex="~"
            space="x-2"
            items="center"
          >
            <span flex="1">
              {{ index }}
            </span>
            <carbon-checkmark v-if="selected" />
          </div>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
