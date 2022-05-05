<script setup lang="ts">
import { onKeyDown, onKeyUp } from '@vueuse/core'
import { BaseFile, CssFile, JsonFile, SFCFile, ScriptFile, useProjectStore } from '~/modules/project'
import { groups, useEditorStore } from '~/modules/editor'
import { useMessageStore } from '~/modules/messages'

const project = useProjectStore()
const editor = useEditorStore()
const messages = useMessageStore()

const filename = ref('')
const target = ref<HTMLElement>()
const input = ref<HTMLInputElement>()

const canShowFilenameError = ref(false)
const canShowFileTypeError = ref(false)

watch(filename, () => {
  canShowFilenameError.value = true
  canShowFileTypeError.value = true
})

watch(() => editor.shouldShowAddFile, () => {
  if (editor.shouldShowAddFile) {
    setTimeout(() => {
      if (input.value)
        input.value.focus()
    }, 0)
  }
})

const showInput = () => {
  editor.shouldShowAddFile = true
}

const hideInput = () => {
  editor.shouldShowAddFile = false
  filename.value = ''
}

const tryCreateFile = () => {
  const curr = filename.value

  if (filename.value.length === 0) {
    hideInput()
    return
  }

  if (project.files[filename.value]) {
    if (canShowFilenameError.value) {
      messages.showErrorMessage(`File ${filename.value} already exists`)
        .then(() => canShowFilenameError.value = true)
      canShowFilenameError.value = false
    }
    return
  }

  if (filename.value.endsWith('.vue')) { project.createFile(new SFCFile({ filename: filename.value, dir: 'src/' })) }
  else if (filename.value.endsWith('.json')) { project.createFile(new JsonFile({ filename: filename.value, dir: 'src/' })) }
  else if (filename.value.endsWith('.ts') || filename.value.endsWith('.js')) { project.createFile(new ScriptFile({ filename: filename.value, dir: 'src/' })) }
  else if (filename.value.endsWith('.css')) { project.createFile(new CssFile({ filename: filename.value, dir: 'src/' })) }
  else {
    if (canShowFileTypeError.value) {
      messages.showErrorMessage(`File type ".${filename.value.split('.').pop()}" is not supported`)
        .then(() => canShowFileTypeError.value = true)
      canShowFileTypeError.value = false
    }
    return
  }

  setTimeout(() => {
    editor.currentFilename = curr
  }, 10)
  hideInput()
}

onKeyDown('Escape', () => hideInput())
onKeyUp('Enter', () => tryCreateFile())
onClickOutside(target, () => tryCreateFile())

const group = computed(() => {
  if (filename.value === '')
    return null

  return groups
    .find((group) => {
      if (typeof group.match === 'string' && group.match === filename.value)
        return group
      else if (typeof group.match === 'function' && group.match(new BaseFile({ filename: filename.value })))
        return group

      return null
    })
})

const icon = computed(() => {
  if (!group.value || !filename.value)
    return 'i-vscode-icons-default-file'

  if (typeof group.value.icon === 'string')
    return group.value.icon

  if (typeof group.value.icon === 'function')
    return group.value.icon(new BaseFile({ filename: filename.value }))

  return 'i-vscode-icons-default-file'
})
</script>

<template>
  <div
    px-2
    flex flex-row items-center
  >
    <div
      v-show="editor.shouldShowAddFile"
      ref="target"
      flex
      flex-row
      h-full
      items-center
      border="r-1 light-900 dark:dark-900"
      bg="light-500 dark:dark-600"
    >
      <div w-4 h-4 mr-1 :class="icon" />
      <input
        ref="input"
        v-model="filename"
        h-full
        type="text"
        bg-transparent
        outline="focus:none"
        placeholder="Component.vue"
        class="dark:placeholder-light-900/40"
      >
      <button mr-2 i-carbon-close w-4 h-4 @click="hideInput()" />
    </div>
    <button
      h-full
      @click="showInput()"
    >
      <div i-carbon-add w-6 h-6 />
    </button>
  </div>
</template>
