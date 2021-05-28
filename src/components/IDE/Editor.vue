<script setup lang="ts">
import { defineProps, defineEmit, ref } from 'vue'
import { useMonaco } from '~/logic/monaco'
import { store } from '~/store'

const emit = defineEmit(['change'])
const props = defineProps<{ language: string, value: string }>()

const target = ref()
const { onChange } = useMonaco(target, {
  language: props.language,
  code: props.value,
})

onChange((content) => {
  emit('change', content)
})

emit('change', props.value)
</script>

<template>
  <div ref="target" class="h-full w-full">

  </div>
</template>
