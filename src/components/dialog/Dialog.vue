<script setup lang="ts">
import { DialogPanel, Dialog as UDialog } from '@headlessui/vue'

const props = defineProps<{ modelValue: boolean }>()
const isOpen = useVModel(props)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <UDialog
    fixed
    z-9002 top-0
    w-full h-full
    grid
    place-content-center
    :open="isOpen"
    @close="isOpen = false"
  >
    <div
      absolute
      inset-0
      bg="dark:dark-900/80 light-500/50"
    />
    <div
      pointer-events-none
      absolute
      inset-0 grid place-items-center
    >
      <DialogPanel
        pointer-events-auto
        w-full
        relative
        rounded
        shadow-xl
        bg="dark:dark-700 light-200"
        v-bind="$attrs"
      >
        <slot />
      </DialogPanel>
    </div>
  </UDialog>
</template>
