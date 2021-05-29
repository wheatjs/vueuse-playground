<script setup lang="ts">
import { store } from '~/store'
</script>

<template>
  <div class="overflow-auto">
    <Message
      v-for="message in store.errors"
      :key="message"
      :message="message"
      type="error"
    />
    <!-- {{ store.errors }} -->
  </div>
</template>
