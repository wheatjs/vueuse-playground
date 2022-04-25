export const useAppStore = defineStore('app', () => {
  const settingsOpen = ref(false)
  const preventCtrlS = useLocalStorage('app:preventCtrlS', true)
  const warnBeforeDeletingFile = useLocalStorage('app:warnBeforeDeletingFile', true)

  const isDark = useDark()

  return {
    preventCtrlS,
    warnBeforeDeletingFile,
    settingsOpen,
    isDark,
  }
})
