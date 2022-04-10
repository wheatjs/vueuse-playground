<script setup lang="ts">
import type { StatusbarItemText } from '.'

defineProps<{ item: StatusbarItemText }>()
</script>

<template>
  <div px-4>
    <span>{{ item.text }}</span>
  </div>
</template>
