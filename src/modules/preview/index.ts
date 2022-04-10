import { previewStatus, previewUpdateDelay } from './usePreview'
import { StatusbarAlignment, createStatusbarSelectItem, createStatusbarTextItem } from '~/modules/statusbar'

export * from './usePreview'

const subscriptions = [
  createStatusbarSelectItem({
    label: computed(() => `Update: ${previewUpdateDelay.value === 0 ? 'Immediate' : `${previewUpdateDelay.value}ms`}`),
    value: previewUpdateDelay,
    alignment: StatusbarAlignment.Right,
    priority: 1,
    options: Array(7).fill(1).map((value, index) => ({ label: index === 0 ? 'Immediate' : `${index * 100}ms`, value: index * 100 })).reverse(),
  }),
  createStatusbarTextItem({
    alignment: StatusbarAlignment.Right,
    priority: 2,
    text: computed(() => {
      if (previewStatus.value.isCompiling)
        return 'Compiling...'
      else if (previewStatus.value.hasErrors)
        return 'Errors occurred'
      else if (previewStatus.value.didCompileSuccessfully)
        return 'Compiled successfully'
    }),
  }),
]

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    subscriptions.forEach(dispose => dispose())
  })
}
