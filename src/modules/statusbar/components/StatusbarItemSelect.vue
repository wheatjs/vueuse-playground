<script setup lang="ts">
import type { StatusbarItemSelect } from '..'

const props = defineProps<{ item: StatusbarItemSelect; modelValue: any }>()
const value = useVModel(props)
</script>

<template>
  <Listbox
    v-model="value"
    direction="up"
  >
    <template #label>
      {{ item.label }}
    </template>
    <ListboxOption
      v-for="option in item.options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </ListboxOption>
  </Listbox>
</template>
