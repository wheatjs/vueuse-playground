<script setup lang="ts">
import type { Message } from '~/modules/messages'

const props = defineProps<{ message: Message }>()
const target = ref<HTMLElement>()

const { isOutside } = useMouseInElement(target)

const { stop, start } = useTimeoutFn(() => {
  props.message.resolve(props.message.timestamp)
}, 5000)

watch(isOutside, () => isOutside.value ? start() : stop())
</script>

<template>
  <div
    ref="target" flex flex-row bg="dark:dark-700" p-4
    items-center
    space-x-2
    rounded
    shadow
    border="1 dark:dark-900"
    pointer-events-auto
  >
    <div>
      <div
        text-2xl
        :class="{
          'i-carbon-error text-red-500': message.type === 'error',
          'i-carbon-warning text-yellow-500': message.type === 'info',
          'i-carbon-information text-blue-500': message.type === 'warn',
        }"
      />
    </div>
    <div flex-1 text-sm>
      {{ message.message }}
    </div>
    <div>
      <IconButton @click="() => message.resolve(message.timestamp)">
        <i i-carbon-close />
      </IconButton>
    </div>
  </div>
</template>
