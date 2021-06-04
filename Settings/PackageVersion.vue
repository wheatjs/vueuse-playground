<script setup lang="ts">
import { defineProps } from 'vue'
import { useFetch } from '@vueuse/core'

const props = defineProps<{ name: string }>()
const { data } = useFetch(`https://api.skypack.dev/v1/package/${props.name}`).get().json()
</script>

<template>
  <div v-if="data">
    <Listbox>
      <option :key="version" :value="version" v-for="version in data.versions">
        {{ version }}
      </option>
    </Listbox>
  </div>
</template>
