import { not } from '@vueuse/core'
import { StatusbarAlignment, createStatusbarTextItem } from '../statusbar'
import { useProjectStore } from './store'

export * from './store'
export * from './types'
export * from './files'

export default function init() {
  const project = useProjectStore()
  const { isAddingPackages } = storeToRefs(project)

  createStatusbarTextItem({
    alignment: StatusbarAlignment.Left,
    priority: 0,
    isHidden: not(isAddingPackages),
    isLoading: isAddingPackages,
    text: computed(() => {
      if (isAddingPackages.value)
        return 'Adding packages...'

      return ''
    }),
  })
}
