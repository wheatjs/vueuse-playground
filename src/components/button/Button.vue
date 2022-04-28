<script setup lang="ts">
const props = defineProps<{
  href?: string
  to?: string
  primary?: boolean
}>()

const is = computed(() => {
  if (props.href)
    return 'a'
  else if (props.to)
    return 'router-link'

  return 'button'
})
</script>

<template>
  <component
    :is="is"
    target="_blank"
    :href="href"
    :to="to"
    px-4 h-8
    flex flex-row
    font-sans
    class="text-sm"
    items-center content-center justify-center
    bg-light-900 dark:bg-dark-400
    rounded
    space-x-1
    :class="{
      '!bg-green-500 !text-green-900 font-bold': primary
    }"
  >
    <slot />
  </component>
</template>
