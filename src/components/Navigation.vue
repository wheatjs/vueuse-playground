<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { isDark } from '~/modules/shared'
import { useFirebaseStore } from '~/modules/firebase'
import { useAppStore } from '~/modules/app'

const app = useAppStore()
const firebase = useFirebaseStore()
const project = useRouteQuery('project')

const save = async() => {
  project.value = await firebase.saveProject()
}

onMounted(async() => {
  if (project.value)
    await firebase.loadProject(project.value as string)
})
</script>

<template>
  <nav
    flex
    flex-col items-center w-16
    py-2 border="r-1 light-900 dark:dark-900"
  >
    <Logo
      w-10
      mb-4
    />
    <IconButton>
      <i i-carbon-notebook />
    </IconButton>
    <IconButton>
      <i i-mdi-pot-mix-outline />
    </IconButton>
    <IconButton @click="save">
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
    <IconButton @click="app.settingsOpen = true">
      <i i="carbon-settings" />
    </IconButton>
  </nav>
</template>
