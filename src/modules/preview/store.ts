export const usePreviewStore = defineStore('preview', () => {
  const isMaximized = ref(false)

  return {
    isMaximized,
  }
})
