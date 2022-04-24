<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>

<template>
  <div
    relative
    z-500
    h-full
  >
    <Menu>
      <MenuButton
        border-l-1
        border-light-900
        dark:border-dark-900
        px-2
        h-full
        text-xs
        flex
        flex-row
        items-center
      >
        <span mr-2>v3.2.31</span>
        <i
          i-carbon-chevron-down
          text-base
        />
      </MenuButton>
      <MenuItems
        absolute
        top-8 right-0
        dark:bg-dark-800
        bg-light-200
        rounded-bl
        shadow
        border
        border-light-900
        dark:border-dark-900
      >
        <slot />
      </MenuItems>
    </Menu>
  </div>
</template>
