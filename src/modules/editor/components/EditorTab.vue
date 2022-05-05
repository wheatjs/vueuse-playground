<script setup lang="ts">
import { useEditorStore } from '../store'
import { groups } from '~/modules/editor'
import { useProjectStore } from '~/modules/project'
import type { BaseFile } from '~/modules/project'

const props = defineProps<{ file?: BaseFile }>()
const editor = useEditorStore()
const project = useProjectStore()

const isCloseDialogOpen = ref(false)

const group = computed(() => {
  const file = props.file

  return groups.find(group => group.match(file as BaseFile))
})

const isActive = computed(() => {
  return props.file?.filename === editor.currentFilename
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
    editor.currentFilename = props.file.filename
}

const deleteFile = () => {
  // isCloseDialogOpen.value = true
  if (props.file)
    project.deleteFile(props.file?.filename)
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
    border="r-1 t-1 r-light-900 dark:r-dark-900 t-transparent"
    bg="light-500 dark:dark-600"
    :class="{
      'text-green-500/80 dark:(!bg-dark-400 !light-900) !border-t-green-500': isActive,
    }"
    @click="activate"
  >
    <div
      w-4
      h-4 :class="[`${icon}`, group?.iconOnly ? '' : 'mr-1']"
    />
    <span v-if="!group?.iconOnly">
      <slot />
    </span>
    <button
      v-if="!file?.isProtected"
      ml-2
      i-carbon-close
      w-4
      h-4 @click.stop="isCloseDialogOpen = true"
    />
    <Dialog v-model="isCloseDialogOpen" max-w-130>
      <div flex flex-row p-8 pb-0 space-x-4>
        <div>
          <div w-12 h-12 i-carbon-warning-alt text-amber-600 />
        </div>
        <div prose>
          <h4 mt="!0">
            Are you sure you want to permanently delete <span text-green-500>'{{ file?.filename }}'</span>?
          </h4>
          <p>
            Your changes will be lost if you don't save them.
          </p>
        </div>
      </div>
      <div
        p-4 pt-2 flex flex-row justify-end
        space-x-2
      >
        <Button @click="isCloseDialogOpen = false">
          Cancel
        </Button>
        <Button primary @click="deleteFile">
          Delete
        </Button>
      </div>
    </Dialog>
  </div>
</template>
