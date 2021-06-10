<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = async() => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pointer-events-none"
    position="fixed bottom-0 left-0 right-0"
    p="8"
    flex="~"
    place="items-center content-center"
  >
    <div
      class="pointer-events-auto"
      border="rounded 1 light-900 dark:dark-900"
      left="1/2"
      bg="light-100 dark:dark-700"
      shadow="~ xl"
      p="4"
      role="alert"
      flex="~ row"
      items="center"
    >
      <div>
        <span v-if="offlineReady">
          VueUse Playground is now available offline
        </span>
        <span v-else>
          Updated VueUse Playground available, reload to update!
        </span>
      </div>
      <div flex="~" items="end" space="x-2">
        <span flex="1" />
        <Button @click="close">
          Close
        </Button>
        <Button v-if="needRefresh" primary @click="updateServiceWorker()">
          Reload
        </Button>
      </div>
    </div>
  </div>
</template>
