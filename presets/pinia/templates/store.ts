import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const name = ref('My Pinia App')

  return {
    name,
  }
})
