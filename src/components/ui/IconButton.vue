<script setup lang="ts">

</script>

<template>
  <button
    border="rounded-full"
    p="2"
    flex="~"
    place="items-center content-center"
    outline="focus:none"
    bg="hover:(light-900) dark:hover:(dark-100)"
  >
    <slot />
  </button>
</template>
