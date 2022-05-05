<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
} from '@headlessui/vue'

const props = withDefaults(defineProps<{
  modelValue: any
  direction: 'up' | 'down'
}>(), {
  direction: 'down',
})

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
    z-1
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
          :class="{
            'i-carbon-chevron-down': direction === 'down',
            'i-carbon-chevron-up': direction === 'up',
          }"
        />
      </ListboxButton>
      <ListboxOptions
        absolute
        :class="{
          'top-8 border-t-0': direction === 'down',
          'bottom-8 border-b-0': direction === 'up',
        }"
        right-0
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
