<script setup lang="ts">
defineProps<{
  selected?: boolean
}>()
</script>

<template>
  <div
    flex flex-row items-center
    rounded
    :class="{
      '!bg-green-500 !text-green-900 !border-green-400 font-bold': selected,
    }"
  >
    <div
      flex
      flex-1
      flex-col
    >
      <div>
        <slot />
      </div>
      <div
        v-if="$slots.subtitle"
        mt="-1"
        text="dark:light-900/50 dark-50"
        :class="{
          '!text-green-900/70': selected,
        }"
      >
        <slot name="subtitle" />
      </div>
      <div
        v-if="$slots.description"
        mt-1
      >
        <slot name="description" />
      </div>
    </div>
    <div v-if="$slots.overflow">
      <slot name="overflow" />
    </div>
  </div>
</template>
