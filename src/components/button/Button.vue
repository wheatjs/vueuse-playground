<script setup lang="ts">

</script>

<template>
  <button
    px-4 h-8
    flex flex-row
    font-sans
    text-sm
    items-center content-center justify-center
    bg-light-900 dark:bg-dark-400
    rounded
  >
    <slot />
  </button>
</template>
