<script setup lang="ts">
import { groups } from '~/modules/editor'
import { filesystem, fs } from '~/modules/filesystem'
import type { BaseFile } from '~/modules/filesystem/files'

const props = defineProps<{ file?: BaseFile }>()

const group = computed(() => {
  const file = props.file

  if (!file)
    return null

  return groups
    .find((group) => {
      if (typeof group.match === 'string' && group.match === (file!).filename)
        return group
      else if (typeof group.match === 'function' && group.match(file!))
        return group

      return null
    })
})

const isActive = computed(() => {
  if (group.value && props.file)
    return group.value.isActive(props.file, fs.currentFilename)
})

const icon = computed(() => {
  const file = props.file

  if (!group.value || !file)
    return 'vscode-icons-default-file'

  if (typeof group.value.icon === 'string')
    return group.value.icon

  if (typeof group.value.icon === 'function')
    return group.value.icon(file)

  return 'vscode-icons-default-file'
})

const activate = () => {
  if (props.file)
    filesystem.currentFile = props.file.filename
}
</script>

<template>
  <div
    flex
    flex-row
    items-center
    px-2
    cursor-pointer
    select-none
    border="r-1 light-900 dark:dark-900"
    bg="light-500 dark:dark-600"
    :class="{
      'text-green-500 !bg-green-500/5': isActive
    }"
    @click="activate"
  >
    <div
      w-4
      h-4 :class="[`i-${icon}`, group?.hideName ? '' : 'mr-1']"
    />
    <span v-if="!group?.hideName">
      <slot />
    </span>
  </div>
</template>
