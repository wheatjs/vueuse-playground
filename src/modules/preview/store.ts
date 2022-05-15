export const usePreviewStore = defineStore('preview', () => {
  const previewUpdateDelay = useLocalStorage('preview:updateDelay', 100)
  const isMaximized = ref(false)

  return {
    previewUpdateDelay,
    isMaximized,
  }
})
