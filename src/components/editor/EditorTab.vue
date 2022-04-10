<script setup lang="ts">
import { filesystem, fs } from '~/modules/filesystem'

const props = defineProps<{ name: string; noIcon?: boolean; isProtected?: boolean }>()
const canDelete = computed(() => !fs.files.find(({ filename }) => filename === props.name)?.isProtected && !props.isProtected)
const isActive = computed(() => fs.currentFilename === props.name)

const setActive = () => filesystem.currentFile = props.name
const removeFile = () => filesystem.deleteFile(props.name)
</script>

<template>
  <div
    pl-2
    h-full
    text-base
    flex
    flex-row
    items-center
    cursor-pointer
    select-none
    :draggable="false"
    bg="dark:(hover:dark-300)"
    border="r-1 light-900 dark:dark-900"
    :class="{
      'pr-1': noIcon,
      'pr-2': !canDelete && !noIcon,
      '!dark:(bg-green-500/5)': isActive
    }"
    @click="setActive"
  >
    <template v-if="!noIcon">
      <template v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <i v-else-if="name.endsWith('vue')" i-vscode-icons-file-type-vue />
      <i v-else-if="name.endsWith('js')" i-vscode-icons-file-type-json />
      <i v-else-if="name.endsWith('json')" i-vscode-icons-file-type-json />
      <i v-else-if="name.endsWith('css')" i-vscode-icons-file-type-css />
      <i v-else i-vscode-icons-default-file />
    </template>
    <div
      text="xs dark:(light-900 opacity-70)"
      font-sans
      font-100
      :class="{
        'ml-2': !noIcon,
        'pr-1': !canDelete,
        '!dark:(text-green-300)': isActive
      }"
    >
      <slot />
    </div>
    <button
      v-if="canDelete"
      mx-1
      :class="{
        '!dark:(text-green-100 text-opacity-0 hover:text-opacity-10)': isActive
      }"
      @click.stop="removeFile()"
    >
      <div i-carbon-close text-base :class="{
        'text-green-500': isActive
      }" />
    </button>
  </div>
</template>
