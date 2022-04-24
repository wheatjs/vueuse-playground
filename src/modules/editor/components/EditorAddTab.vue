<script setup lang="ts">
import { onKeyDown, onKeyUp } from '@vueuse/core'
import { BaseFile, CssFile, JsonFile, SFCFile, ScriptFile, useProjectStore } from '~/modules/project'
import { groups } from '~/modules/editor'

const project = useProjectStore()

const filename = ref('')
const show = ref(false)
const target = ref<HTMLElement>()
const input = ref<HTMLInputElement>()

const showInput = () => {
  show.value = true

  setTimeout(() => {
    if (input.value)
      input.value.focus()
  }, 0)
}

const hideInput = () => {
  show.value = false
  filename.value = ''
}

onKeyDown('Escape', e => hideInput())

onKeyUp('Enter', (e) => {
  if (filename.value.endsWith('.vue'))
    project.createFile(new SFCFile({ filename: filename.value }))

  else if (filename.value.endsWith('.json'))
    project.createFile(new JsonFile({ filename: filename.value }))

  else if (filename.value.endsWith('.ts') || filename.value.endsWith('.js'))
    project.createFile(new ScriptFile({ filename: filename.value }))

  else if (filename.value.endsWith('.css'))
    project.createFile(new CssFile({ filename: filename.value }))

  hideInput()
})

onClickOutside(target, () => hideInput())

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
    return 'vscode-icons-default-file'

  if (typeof group.value.icon === 'string')
    return group.value.icon

  if (typeof group.value.icon === 'function')
    return group.value.icon(new BaseFile({ filename: filename.value }))

  return 'vscode-icons-default-file'
})
</script>

<template>
  <div
    px-2
    flex flex-row items-center
  >
    <div
      v-show="show"
      ref="target"
      flex
      flex-row
      h-full
      items-center
      border="r-1 light-900 dark:dark-900"
      bg="light-500 dark:dark-600"
    >
      <div
        w-4 h-4
        mr-1
        :class="[`i-${icon}`]"
      />
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
      <button
        mr-2
        i-carbon-close
        w-4 h-4
        @click="hideInput()"
      />
    </div>
    <button
      h-full
      @click="showInput()"
    >
      <div
        i-carbon-add
        w-6 h-6
      />
    </button>
  </div>
</template>
