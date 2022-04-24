<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
</script>

<template>
  <MenuItem
    v-slot="{ active }"
  >
    <a
      :class="{ 'bg-blue-500': active }"
      href="/account-settings"
    >
      <slot />
    </a>
  </MenuItem>
</template>
