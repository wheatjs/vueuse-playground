<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { createWorkers, useMonacoImport } from '../monaco'
import type { BaseFile } from '~/modules/project'
import { useProjectStore } from '~/modules/project'
import { groups, useEditorStore } from '~/modules/editor'

await useMonacoImport()
await createWorkers()

const project = useProjectStore()
const editor = useEditorStore()

const currentFile = computed(() => project.files[editor.currentFilename])
const group = computed(() => {
  if (currentFile.value)
    return groups.find(group => group.match(currentFile.value as BaseFile))
})
</script>

<template>
  <div h-full>
    <div
      v-if="!currentFile"
      h-full flex place-content-center
      place-items-center
      text="sm dark:light-900/50 dark-50"
    >
      No File Selected
    </div>
    <Splitpanes
      v-else
      horizontal
    >
      <Pane
        v-for="e in group?.editors"
        :key="e.name"
      >
        <Titlebar
          flex-shrink-0
          pr="!0" border-t-0
        >
          <i
            i="carbon-chevron-down"
            mr-1 text-base
          />
          {{ e.name }}
        </Titlebar>
        <Editor
          flex-1
          h="[calc(100%-32px)]"
          :model="e.model(currentFile as BaseFile, project.files)"
        />
      </Pane>
    </Splitpanes>
  </div>
</template>
