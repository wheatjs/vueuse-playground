export const usePreviewStore = defineStore('preview', () => {
  const previewUpdateDelay = ref(100)
  const isMaximized = ref(false)

  return {
    previewUpdateDelay,
    isMaximized,
  }
})
