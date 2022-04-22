export const useAppStore = defineStore('app', () => {
  const settingsOpen = ref(false)

  return {
    settingsOpen,
  }
})
