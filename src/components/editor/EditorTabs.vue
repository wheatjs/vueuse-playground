<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
// import { getExtensionFromFilename } from '@playground/shared'
import Draggable from 'vuedraggable'
import { SUPPORTED_EXTENSIONS, filesystem, fs } from '~/modules/filesystem'
import { CssFile, JsonFile, SFCFile, ScriptFile } from '~/modules/filesystem/files'

const getExtensionFromFilename = (name: string) => {
  const split = name.split('.')
  return split[split.length - 1]
}

const target = ref<HTMLInputElement>()
const isAddingFile = ref(false)
const filename = ref('')
// const isValidFile = computed(() => {
//   if (filename.value in fs.files)
//     return false
//   return true
// })
const doAddFile = () => {
  isAddingFile.value = true
  setTimeout(() => {
    if (target.value)
      target.value.focus()
  }, 0)
}
const addFile = (name: string) => {
  if (name.length > 0) {
    if (!SUPPORTED_EXTENSIONS.includes(getExtensionFromFilename(name)))
      name = `${name}.vue`
    if (name.endsWith('.vue'))
      filesystem.createFile(new SFCFile({ filename: name }))
    else if (name.endsWith('.js') || name.endsWith('.ts'))
      filesystem.createFile(new ScriptFile({ filename: name }))
    else if (name.endsWith('.json'))
      filesystem.createFile(new JsonFile({ filename: name }))
    else if (name.endsWith('.css'))
      filesystem.createFile(new CssFile({ filename: name }))
    isAddingFile.value = false
    filename.value = ''
    filesystem.currentFile = name
  }
}
const onScroll = (e: WheelEvent) => {
  e.preventDefault()
  const target = (e.currentTarget as HTMLElement)
  target.scrollLeft += e.deltaY
}
onClickOutside(target, () => {
  isAddingFile.value = false
  addFile(filename.value)
  filename.value = ''
})
</script>

<template>
  <div position="relative" h-full flex-shrink-0>
    <Draggable
      v-model="fs.files"
      :component-data="{ 'onWheel': onScroll, class: 'flex h-full overflow-x-auto overflow-y-hidden small-scrollbar' }"
      item-key="filename"
    >
      <template #header>
        <EditorTab no-icon name="main.ts" :is-protected="true">
          <div text-base i-carbon-application />
        </EditorTab>
        <EditorTab no-icon name="main.css" :is-protected="true">
          <div text-base i-carbon-color-palette />
        </EditorTab>
      </template>
      <template #item="{ element }">
        <EditorTab
          v-if="!element.hide"
          :name="element.filename"
          flex="inline"
        >{{ element.filename }}</EditorTab>
      </template>
      <template #footer>
        <div h="full" flex="~" place="items-center">
          <EditorTab v-show="isAddingFile" name="__PROTECTED__">
            <template #icon>
              <i v-if="filename.endsWith('vue')" i-vscode-icons-file-type-vue />
              <i v-else-if="filename.endsWith('js')" i-vscode-icons-file-type-json />
              <i v-else-if="filename.endsWith('json')" i-vscode-icons-file-type-json />
              <i v-else-if="filename.endsWith('css')" i-vscode-icons-file-type-css />
              <i v-else i-vscode-icons-default-file />
            </template>
            <input
              ref="target"
              v-model="filename"
              type="text"
              w-22
              bg-transparent
              caret-green-500
              text-xs
              text="dark:(placeholder-light-900 placeholder-opacity-40)"
              outline="focus:none"
              placeholder="Component.vue"
              @keydown.enter="addFile(filename)"
            />
          </EditorTab>
          <IconButton @click="doAddFile()">
            <i i-carbon-add />
          </IconButton>
        </div>
      </template>
    </Draggable>
  </div>
</template>

<style>
.small-scrollbar::-webkit-scrollbar {
  height: 4px;
}
</style>
