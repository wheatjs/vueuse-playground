<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: any
  type?: any
  placeholder?: string
}>(), {
  type: 'text',
})

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
  >
    <div
      v-if="$slots.icon"
      pl-2
      flex flex-row items-center
      op50
    >
      <slot name="icon" />
    </div>
    <input
      v-model="value"
      :placeholder="placeholder"
      w-full
      px-2
      h-full
      bg="transparent"
      outline="focus:none"
      :type="type"
    >
  </div>
</template>
