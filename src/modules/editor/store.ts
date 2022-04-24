export const useEditorStore = defineStore('editor', () => {
  const currentFilename = ref('')

  return {
    currentFilename,
  }
})
