<script setup lang="ts">
import type { StatusbarItemButton } from '..'

defineProps<{ item: StatusbarItemButton }>()
</script>

<template>
  <button
    h-full
    pl-2
    pr-4
    flex flex-row
    place-items-center
    brightness="hover:80"
    :style="{
      background: item.background as string,
      color: item.foreground as string,
    }"
    @click="item.onClick"
  >
    <div
      w-5
      h-5
      mr-1
      :class="[`i-${item.icon}`]"
    />
    <span
      font-bold
      font-mono
    >
      {{ item.text }}
    </span>
  </button>
</template>
