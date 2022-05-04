<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useProjectStore } from '~/modules/project'
import { groups, useEditorStore } from '~/modules/editor'
import type { BaseFile } from '~/modules/project'

const project = useProjectStore()
const editor = useEditorStore()
const files = ref<string[]>([])

const pinnedFileGroups = computed(() => {
  return groups
    .filter(x => x.pinned)
    .map(x => x.editors[0]?.name)
    .filter(x => files.value.includes(x))
})

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
    overflow-hidden
    w-full
  >
    <Draggable
      v-model="files"
      :component-data="{ 'onWheel': onScroll, class: 'flex h-full overflow-y-hidden small-scrollbar cursor-grab' }"
      item-key="filename"
      @dblclick.self="editor.shouldShowAddFile = true"
    >
      <template #header>
        <template v-for="pinned in pinnedFileGroups" :key="pinned">
          <EditorTab :file="(project.files[pinned] as BaseFile)">
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

<style>
  .small-scrollbar {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    overflow-y: overlay;
  }

  .small-scrollbar::-webkit-scrollbar {
    height: 3px;
  }

  .small-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-dark-900/30;
    cursor: pointer;
  }

  .dark .small-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-dark-900/70
  }
</style>
