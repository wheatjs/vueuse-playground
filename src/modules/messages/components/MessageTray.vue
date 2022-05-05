<script setup lang="ts">
import { useMessageStore } from '~/modules/messages'

const messages = useMessageStore()
</script>

<template>
  <div
    fixed right-0 bottom-8 p-4
    max-w-100 w-full
    h-full
    z-900
    pointer-events-none
    flex flex-col-reverse
    overflow-hidden
    gap-2
  >
    <Message v-for="message in messages.messages" :key="message.timestamp" :message="message" />
  </div>
</template>

