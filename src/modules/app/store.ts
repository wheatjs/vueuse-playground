export const useAppStore = defineStore('app', () => {
  const showWelcome = useLocalStorage('app:showWelcome', true)
  const welcomeOpen = ref(false)
  const settingsOpen = ref(false)
  const preventCtrlS = useLocalStorage('app:preventCtrlS', true)
  const warnBeforeDeletingFile = useLocalStorage('app:warnBeforeDeletingFile', true)

  const isDark = useDark()

  if (showWelcome.value)
    welcomeOpen.value = true

  return {
    showWelcome,
    welcomeOpen,
    preventCtrlS,
    warnBeforeDeletingFile,
    settingsOpen,
    isDark,
  }
})
