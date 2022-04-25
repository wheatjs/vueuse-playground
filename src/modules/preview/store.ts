export const usePreviewStore = defineStore('preview', () => {
  const previewUpdateDelay = ref(0)
  const isMaximized = ref(false)

  return {
    previewUpdateDelay,
    isMaximized,
  }
})
