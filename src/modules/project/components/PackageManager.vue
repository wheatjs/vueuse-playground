<script setup lang="ts">
import { useProjectStore } from '~/modules/project'

const project = useProjectStore()
</script>

<template>
  <Dialog v-model="project.isPackageManagerDialogOpen">
    Testing
  </Dialog>
</template>
