import { openInStackblitz } from './stackblitz'
import { StatusbarAlignment, createStatusbarButtonItem } from '~/modules/statusbar'

const subscriptions = [
  createStatusbarButtonItem({
    onClick() {
      openInStackblitz()
    },
    priority: 5,
    text: 'Open in Stackblitz',
    alignment: StatusbarAlignment.Right,
    icon: 'custom-stackblitz?mask',
    foreground: 'hsl(210deg 98% 15%)',
    background: '#1389fd',
  }),
]

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    subscriptions.forEach(dispose => dispose())
  })
}
