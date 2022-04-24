<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
} from '@headlessui/vue'

const props = defineProps<{
  modelValue: any
}>()

const value = useVModel(props)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    relative
    h-full
    z-5000
  >
    <Listbox v-model="value">
      <ListboxButton
        v-bind="$attrs"
        px-2
        h-full
        text-xs
        flex
        flex-row
        items-center
        w-full
      >
        <span
          text-left
          flex-1
          block
          whitespace-nowrap
        >
          <slot name="label" />
        </span>
        <i
          ml-2
          text-base
          i-carbon-chevron-up
        />
      </ListboxButton>
      <ListboxOptions
        absolute
        bottom-8
        right-0
        border-b-0
        dark:bg-dark-700
        border-1
        border-light-900
        dark:border-dark-900
        w-full
      >
        <slot />
      </ListboxOptions>
    </Listbox>
  </div>
</template>
