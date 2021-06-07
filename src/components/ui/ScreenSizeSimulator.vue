<script setup lang="ts">
import { ref } from 'vue'

const sizes = {
  'Moto 4G': [360, 640],
  'Galaxy S5': [360, 640],
  'Pixel 2': [411, 731],
  'Pixel 2 XL': [411, 823],
  'iPhone 5/SE': [320, 568],
  'iPhone 6/7/8': [375, 667],
  'iPhone 6/7/8 Plus': [414, 736],
  'iPhone X': [375, 812],
  'iPad': [768, 1024],
  'iPad Pro': [1024, 1366],
  'Surface Duo': [540, 720],
  'Galaxy Fold': [280, 653],
}

const selected = ref('Default')
</script>

<template>
  <Listbox v-model="selected">
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
          {{ selected }}
        </span>
        <carbon-chevron-down />
      </ListboxButton>
      <ListboxOptions
        position="absolute top-5 right-0"
        bg="dark:dark-900"
        border="rounded-b rounded-tl"
        list="none"
        p="0"
      >
        <ListboxOption v-for="(size, index) in sizes" :key="index" :value="index">
          <div
            p="x-4 y-2"
            cursor="pointer"
            bg="hover:dark:(dark-500)"
            class="whitespace-nowrap"
          >
            {{ index }}
          </div>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
