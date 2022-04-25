<script setup lang="ts">
import { ListboxOption } from '@headlessui/vue'

defineProps<{
  value: string
  disabled?: boolean
}>()
</script>

<template>
  <ListboxOption
    v-slot="{ selected, active }"
    :value="value"
    :disabled="disabled"
  >
    <div
      px-2
      h-6 flex
      flex-row
      items-center
      cursor-pointer
      whitespace-nowrap
      :class="{ 'bg-light-900 dark:bg-dark-400': active, 'text-green-500': selected }"
    >
      <slot />
    </div>
  </ListboxOption>
</template>
