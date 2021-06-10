<script setup lang="ts">
import { ref } from 'vue'
import Playground from './components/playground/Playground.vue'
import ReloadPrompt from './components/ReloadPrompt.vue';

const isOpen = ref(false)
</script>

<template>
  <div class="h-screen dark:bg-dark-900 p-4 dark:text-light-100 pl-18">
    <Navigation v-model="isOpen" />
    <Playground />
  </div>
  <Settings v-model="isOpen" />
  <ReloadPrompt />
</template>
