<script setup lang="ts">
import { DialogOverlay, Dialog as UDialog } from '@headlessui/vue'

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
      bg="dark:dark-900/80 light-500/50"
      @click="isOpen = false"
    />
    <div
      pointer-events-none
      absolute
      inset-0 grid place-items-center
    >
      <div
        pointer-events-auto
        w-full
        relative
        rounded
        shadow-xl
        bg="dark:dark-700 light-200"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </div>
  </UDialog>
</template>
