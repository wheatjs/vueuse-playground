<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { filesystem, fs } from '~/modules/filesystem'
import { createWorkers, useMonacoImport } from '~/monaco'
import { groups } from '~/modules/editor'

await useMonacoImport()
await createWorkers()

const file = computed(() => filesystem.files[fs.currentFilename])

const currentGroup = computed(() => {
  if (file.value)
    return groups.find(group => group.isActive(file.value, file.value.filename))
})
</script>

<template>
  <Splitpanes horizontal>
    <Pane
      v-for="(editor) in currentGroup?.editors"
      :key="editor.name"
    >
      <Titlebar
        flex-shrink-0
        pr="!0" border-t-0
      >
        <i
          i="carbon-chevron-down"
          mr-1 text-base
        />
        {{ editor.name }}
      </Titlebar>
      <Editor
        flex-1
        :model="editor.model(file, filesystem.files)"
      />
    </Pane>
  </Splitpanes>
</template>
