<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useProjectStore } from '~/modules/project'
import { groups, useEditorStore } from '~/modules/editor'
import type { BaseFile } from '~/modules/project'

const project = useProjectStore()
const editor = useEditorStore()
const files = ref<string[]>([])

project.onFileCreated(() => {
  files.value = Object.values(project.files).map(file => file.filename)
})

project.onFileDeleted(() => {
  files.value = Object.values(project.files).map(file => file.filename)
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
        <template
          v-for="pinned in files"
          :key="pinned"
        >
          <EditorTab
            v-if="!isUnpinned(pinned)"
            :file="(project.files[pinned] as BaseFile)"
          >
            {{ pinned }}
          </EditorTab>
        </template>
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
