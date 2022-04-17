<script setup lang="ts">
import { Dialog, DialogDescription, DialogOverlay, DialogTitle } from '@headlessui/vue'

const props = defineProps<{ modelValue: boolean }>()
const isOpen = useVModel(props)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Dialog
    fixed
    z-9000 top-0
    w-full h-full
    grid
    place-content-center
    :open="isOpen"
    @close="isOpen = false"
  >
    <DialogOverlay
      absolute
      inset-0
      bg="dark:dark-900/80"
    />
    <div
      absolute
      inset-0 grid place-items-center
    >
      <div
        w-full
        relative
        rounded
        shadow-xl
        bg="dark:dark-700"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </div>
  </Dialog>
</template>
