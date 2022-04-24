<script setup lang="ts">
defineProps<{
  isSelected: boolean
}>()
</script>

<template>
  <div
    px-2
    flex flex-row items-center
    h-full
    cursor-pointer
    select-none
    border="b-1 transparent"
    :class="{
      '!border-green-500': isSelected
    }"
  >
    <slot />
  </div>
</template>
