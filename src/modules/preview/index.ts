import { previewUpdateDelay } from './usePreview'
import { StatusbarAlignment, createStatusbarSelectItem } from '~/modules/statusbar'

export * from './usePreview'
export * from './store'

const subscriptions = [
  createStatusbarSelectItem({
    label: computed(() => `Update: ${previewUpdateDelay.value === 0 ? 'Immediate' : `${previewUpdateDelay.value}ms`}`),
    value: previewUpdateDelay,
    alignment: StatusbarAlignment.Right,
    priority: 1,
    options: Array(7).fill(1).map((value, index) => ({ label: index === 0 ? 'Immediate' : `${index * 100}ms`, value: index * 100 })).reverse(),
  }),
]

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    subscriptions.forEach(dispose => dispose())
  })
}
