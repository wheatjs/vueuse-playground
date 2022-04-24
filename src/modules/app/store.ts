export const useAppStore = defineStore('app', () => {
  const settingsOpen = ref(false)
  const isDark = useDark()

  return {
    settingsOpen,
    isDark,
  }
})
