import type { Ref } from 'vue'
import { useAppStore } from './store'
export * from './store'

export interface AppSettings {
  name: string
  description: string
  value: Ref<string | number | boolean>
  type: 'number' | 'string' | 'boolean'
  enum?: string[]
  enumDescriptions?: string[]
}

export const appSettings = ref<Record<string, AppSettings[]>>({})

export function createAppSettings(group: string, settings: AppSettings[]) {
  if (group in appSettings.value) {
    const currentSettings: AppSettings[] = appSettings.value[group]!

    appSettings.value = {
      ...appSettings.value,
      [group]: [...currentSettings, ...settings],
    }
  }
  else {
    appSettings.value = {
      ...appSettings.value,
      [group]: settings,
    }
  }
}

export default function init() {
  const app = useAppStore()
  const { warnBeforeDeletingFile, preventCtrlS, showWelcome } = storeToRefs(app)

  createAppSettings('General', [
    {
      name: 'Show "Welcome" on startup',
      description: 'Show the welcome screen on startup',
      type: 'boolean',
      value: showWelcome,
    },
    {
      name: 'Override Ctrl+S default behavior',
      description: 'Prevent the page from trying to save as HTML file when Ctrl+S is pressed',
      type: 'boolean',
      value: preventCtrlS,
    },
    {
      name: 'Warn before deleting file',
      description: 'Show a warning before deleting a file',
      type: 'boolean',
      value: warnBeforeDeletingFile,
    },
  ])
}
