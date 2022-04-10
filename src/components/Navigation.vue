<script setup lang="ts">
import { isDark } from '~/modules/shared'
</script>

<template>
  <nav flex flex-col items-center w-16 py-2 border="r-1 light-900 dark:dark-900">
    <Logo w-10 mb-4 />
    <IconButton>
      <i i-carbon-notebook />
    </IconButton>
    <IconButton>
      <i i-mdi-pot-mix-outline />
    </IconButton>
    <IconButton>
      <i i-carbon-share />
    </IconButton>
    <IconButton>
      <i i-carbon-debug />
    </IconButton>
    <IconButton>
      <i i-carbon-logo-github />
    </IconButton>

    <span flex-1 />
    <IconButton @click="isDark = !isDark">
      <i i="carbon-sun dark:carbon-moon" />
    </IconButton>
    <IconButton>
      <i i="carbon-settings" />
    </IconButton>
  </nav>
</template>
