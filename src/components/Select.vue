<script setup lang="ts">
const props = defineProps<{
  modelValue: any
}>()

const value = useVModel(props)
</script>

<template>
  <div
    bg="dark:dark-400 light-500"
    border="1 dark:dark-900 light-900"
    ring="focus-within:(2 green-500)"
    rounded
    h-8
    inline-flex flex-row
    items-center
    relative
  >
    <div
      v-if="$slots.icon"
      pl-2
      flex flex-row items-center
      op50
    >
      <slot name="icon" />
    </div>
    <select
      v-model="value"
      appearance-none
      w-full
      px-2
      h-full
      bg="transparent"
      outline="focus:none"
      class="select"
      pr-8
    >
      <slot />
    </select>
    <div
      i-carbon-chevron-down
      absolute
      pointer-events-none
      right-2
    />
  </div>
</template>

<style>
.select option {
  @apply dark:bg-dark-500;
}
</style>
