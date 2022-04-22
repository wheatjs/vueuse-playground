import type { Ref } from 'vue'
export * from './store'

export const appSettings = ref<Record<string, AppSettings[]>>({

})

export interface AppSettings {
  name: string
  description: string
  value: Ref<string | number | boolean>
  type: 'number' | 'string' | 'boolean'
  enum?: string[]
  enumDescriptions?: string[]
}

export function createAppSettings(group: string, settings: AppSettings[]) {
  if (group in appSettings.value) {
    const currentSettings = appSettings.value[group]!

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
    name: 'ok',
    description: 'yeah',
  },
])
