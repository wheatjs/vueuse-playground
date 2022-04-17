<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { isDark } from '~/modules/shared'
import { useFirebaseStore } from '~/modules/firebase'

const firebase = useFirebaseStore()
const project = useRouteQuery('project')

const save = async() => {
  project.value = await firebase.saveProject()
}

onMounted(async() => {
  if (project.value) {
    const x = await firebase.loadProject(project.value as string)
    console.log(x)
  }
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
    <IconButton>
      <i i="carbon-settings" />
    </IconButton>
  </nav>
</template>
