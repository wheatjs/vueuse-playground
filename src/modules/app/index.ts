import type { Ref } from 'vue'
export * from './store'

export const preventCtrlS = useLocalStorage('app:preventCtrlS', true)

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

    appSettings.value[group] = {
      ...currentSettings,
      ...settings,
    }
  }
  else {
    appSettings.value[group] = settings
  }
}

createAppSettings('General', [
  {
    name: 'Override Ctrl+S default behavior',
    description: 'Prevent the page from trying to save as HTML file when Ctrl+S is pressed',
    type: 'boolean',
    value: preventCtrlS,
  },
])
