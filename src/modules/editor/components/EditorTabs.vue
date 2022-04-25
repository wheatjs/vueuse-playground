<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useProjectStore } from '~/modules/project'
import type { EditorGroup } from '~/modules/editor'
import { groups, useEditorStore } from '~/modules/editor'
import type { BaseFile } from '~/modules/project'

interface TabGroup {
  group: EditorGroup
  file: BaseFile
}

const project = useProjectStore()
const editor = useEditorStore()
const files = ref<string[]>([])

project.onFileCreated(() => {
  files.value = Object.values(project.files).map(file => file.filename)
})

project.onFileDeleted(() => {
  files.value = Object.values(project.files).map(file => file.filename)
})

const pinnedFiles = computed<TabGroup[]>(() => {
  const pinned: TabGroup[] = []

  Object.values(project.files)
    .forEach((file) => {
      const group = groups.find(group => group.match(file as BaseFile))

      if (group && group.pinned) {
        pinned.push({
          group,
          file: file as BaseFile,
        })
      }
    })

  return pinned
})

const isUnpinned = (filename: string) => {
  const file = project.files[filename]
  const group = groups.find(group => group.match(file as BaseFile))

  return group && !group.pinned
}

const onScroll = (e: WheelEvent) => {
  e.preventDefault()
  const target = (e.currentTarget as HTMLElement)
  target.scrollLeft += e.deltaY
}
</script>

<template>
  <div
    relative
    h-full flex-shrink-0
    flex-1
  >
    <Draggable
      v-model="files"
      :component-data="{ 'onWheel': onScroll, class: 'flex h-full overflow-x-auto overflow-y-hidden small-scrollbar cursor-grab' }"
      item-key="filename"
      @dblclick.self="editor.shouldShowAddFile = true"
    >
      <template #header>
        <EditorTab
          v-for="pinned in pinnedFiles"
          :key="pinned.file.filename"
          :file="pinned.file"
        >
          {{ pinned.file.filename }}
        </EditorTab>
      </template>

      <template #item="{ element }">
        <EditorTab
          v-if="isUnpinned(element)"
          :file="(project.files[element] as BaseFile)"
        >
          {{ element }}
        </EditorTab>
      </template>

      <template #footer>
        <EditorAddTab />
      </template>
    </Draggable>
  </div>
</template>
