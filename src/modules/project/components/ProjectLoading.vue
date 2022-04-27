<script setup lang="ts">
import { useProjectStore } from '../store'

const project = useProjectStore()
</script>

<template>
  <div
    v-if="project.isCreatingProject"
    fixed inset-0
    bg="dark:dark-900/70"
    gap-4
    z-9000
    grid place-items-center place-content-center
  >
    <Spinner />
    <div
      font-mono
      text-lg
    >
      Opening Project
    </div>
  </div>
</template>
