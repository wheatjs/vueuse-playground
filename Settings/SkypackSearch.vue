<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFetch, useThrottle } from '@vueuse/core'

const query = ref('')
const thorttledQuery = useThrottle(query, 1000)
const url = computed(() => `https://api.skypack.dev/v1/search?q=${thorttledQuery.value}`)

const { data } = useFetch(url, { refetch: true }).get().json()
</script>

<template>
  <div class="h-[50vh]">
    <div class="h-14 bg-light-400 dark:bg-dark-900 flex flex-row items-center px-4">
      <ph-package class="text-xl" />
      <input v-model="query" type="text" class="h-full flex-1 px-4 bg-transparent focus:outline-none" placeholder="Search Skypack Packages...">
    </div>
    <div class="content-container overflow-auto">
      <div v-if="query === ''" class="grid gap-2 text-lg h-full place-items-center place-content-center">
        <carbon-search class="text-4xl" />
        <span>
          Find & Install Packages from Skypack
        </span>
      </div>
      <template v-else-if="data && data.results">
        <PackageItem
          v-for="item in data.results"
          v-bind="item"
          :key="item.name"
        />
        <!-- <SkypackItem v-for="item in data.results" v-bind="item" :key="item.name" /> -->
      </template>
    </div>
  </div>
</template>

<style>
  .content-container {
    height: calc(100% - 56px);
  }
</style>
