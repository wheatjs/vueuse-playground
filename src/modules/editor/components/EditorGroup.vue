<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { createMonacoInstance, createWorkers, useMonacoImport } from '../monaco'
// import { generateTypescriptDefinition } from '../monaco/typescript'
import type { BaseFile, ScriptFile } from '~/modules/project'
import { useProjectStore } from '~/modules/project'
import { groups, useEditorStore } from '~/modules/editor'

await useMonacoImport()
await createWorkers()

const { monaco } = await createMonacoInstance()

const project = useProjectStore()
const editor = useEditorStore()

const currentFile = computed(() => project.files[editor.currentFilename])
const group = computed(() => {
  if (currentFile.value)
    return groups.find(group => group.match(currentFile.value as BaseFile))
})

const doDTS = async() => {
  // if (editor.currentFilename.endsWith('.ts')) {
  //   if (project.files[editor.currentFilename]) {
  //     const file = project.files[editor.currentFilename] as ScriptFile
  //     const model = file.script.model!

  //     console.log('Using model to generate dts')
  //     console.log(await generateTypescriptDefinition(monaco, model))
  //   }
  // }
  // else {
  //   console.log('Not a typescript file')
  // }
}
</script>

<template>
  <div
    h-full
    relative
    z-500
  >
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
          <span flex-1>
            {{ e.name }}
          </span>
          <button
            px-4
            @click="doDTS"
          >
            DTS
          </button>
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
