import { usePreviewStore } from './store'
import { StatusbarAlignment, createStatusbarSelectItem } from '~/modules/statusbar'

export * from './usePreview'
export * from './store'
export * from './types'

export default function init() {
  const preview = usePreviewStore()
  const { previewUpdateDelay } = storeToRefs(preview)

  createStatusbarSelectItem({
    label: computed(() => `Update: ${previewUpdateDelay.value === 0 ? 'Immediate' : `${previewUpdateDelay.value}ms`}`),
    value: previewUpdateDelay,
    alignment: StatusbarAlignment.Right,
    priority: 1,
    options: Array(7).fill(1).map((_, index) => ({ label: index === 0 ? 'Immediate' : `${index * 100}ms`, value: index * 100 })).reverse(),
  })
}
