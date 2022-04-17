<script setup lang="ts">
import Draggable from 'vuedraggable'
import { fs } from '~/modules/filesystem'
import { onClickOutside } from '@vueuse/core'
import { groups, EditorGroupType } from '~/modules/editor'
import { BaseFile } from '~/modules/filesystem/files';

const shouldHide = (file: BaseFile) => {
  return groups
    .filter(group => group.type === EditorGroupType.AUTOMATIC)
    .find(group => {
      if (typeof group.match === 'string') {
        if (group.exclude)
          return group.exclude.includes(file.filename)
      } else if (typeof group.match === 'function' && group.match(file)) {
        if (group.exclude)
          return group.exclude.includes(file.filename)
      }
    })
}

const pinnedGroups = computed(() => {
  return groups
    .filter(group => group.type === EditorGroupType.PREDEFINED)
})

const onScroll = (e: WheelEvent) => {
  e.preventDefault()
  const target = (e.currentTarget as HTMLElement)
  target.scrollLeft += e.deltaY
}
</script>

<template>
  <div relative h-full flex-shrink-0>
    <Draggable
      v-model="fs.files"
      :component-data="{ 'onWheel': onScroll, class: 'flex h-full overflow-x-auto overflow-y-hidden small-scrollbar' }"
      item-key="filename"
    >
      <template #header>
        <EditorTab :file="group.file" v-for="group in pinnedGroups">{{ group.name }}</EditorTab>
      </template>

      <template #item="{ element }">
        <EditorTab v-if="!shouldHide(element)" :file="element">{{ element.filename }}</EditorTab>
      </template>

      <template #footer></template>
    </Draggable>
  </div>
</template>
