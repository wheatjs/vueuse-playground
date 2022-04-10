<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { filesystem, fs } from '~/modules/filesystem'
import { CssFile, JsonFile, SFCFile, ScriptFile } from '~/modules/filesystem/files'
import { createWorkers, useMonacoImport } from '~/monaco'

await useMonacoImport()
await createWorkers()

// To ensure that monaco loads all the wokers we need to define each langage
// in a model
const settingsModel = (filesystem.files['settings.json'] as JsonFile).json.model

const topEditor = computed(() => {
  const currrentFile = filesystem.files[fs.currentFilename]

  if (!currrentFile) return null
  if (currrentFile instanceof CssFile) return currrentFile.css.model
  if (currrentFile instanceof JsonFile) return currrentFile.json.model
  if (currrentFile instanceof ScriptFile) return currrentFile.script.model
  if (currrentFile instanceof SFCFile) return currrentFile.script.model
})

const bottomEditor = computed(() => {
  const currrentFile = filesystem.files[fs.currentFilename]

  if (!currrentFile) return null
  if (currrentFile.filename === 'main.ts') return settingsModel
  if (currrentFile instanceof SFCFile) return currrentFile.template.model
})

const styleModel = computed(() => {
  const currrentFile = filesystem.files[fs.currentFilename]

  if (!currrentFile) return null
  if (currrentFile instanceof SFCFile && currrentFile.style) return currrentFile.style.model
})

const type = computed(() => {
  const currrentFile = filesystem.files[fs.currentFilename]

  if (currrentFile instanceof CssFile) return 'sfc:style'
  if (currrentFile instanceof JsonFile) return 'json'
  if (currrentFile instanceof ScriptFile) return 'script'

  return 'sfc:script'
})
</script>

<template>
  <Splitpanes horizontal>
    <Pane flex flex-col>
      <Titlebar flex-shrink-0 pr="!0" border-t-0>
        <i i="carbon-chevron-down" mr-1 text-base />
        <span flex-1>Script Setup</span>
      </Titlebar>
      <Editor flex-1 :model="topEditor" />
    </Pane>
    <Pane v-if="bottomEditor" flex flex-col>
      <Titlebar flex-shrink-0>
        <i i="carbon-chevron-down" mr-1 text-base />
        Template
      </Titlebar>
      <Editor flex-1 :model="bottomEditor" />
    </Pane>
  </Splitpanes>
</template>
