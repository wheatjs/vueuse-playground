<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { orchestrator } from '~/orchestrator'

const props = defineProps<{
  name: string
  description: string
  url?: string
  version: string
}>()

const isInstalled = computed(() => !!orchestrator.packages.find(({ name }) => name === props.name))
</script>

<template>
  <!-- <div
    flex="~"
    items="center"
    p="x-4 y-2"
    bg="hover:(dark:dark-500 light-500)"
  >
    <div flex="~ col 1">
      <span text="dark:(light-900 opacity-90)">{{ name }}</span>
      <span text="sm dark:(light-900 opacity-70)" class="line-clamp-1">{{ description }}</span>
    </div>

    <div v-if="isInstalled">
      {{ isInstalled }}
    </div>
    <AppButton v-else>
      INSTALL
    </AppButton> -->
  <!-- </div> -->
</template>
