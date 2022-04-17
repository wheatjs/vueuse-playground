import { initializeApp } from 'firebase/app'
import { get, getDatabase, ref, set } from 'firebase/database'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import config from '@playground/config'
import { nanoid } from 'nanoid'
import { filesystem } from '../filesystem'

export * from './types'

export const app = initializeApp({
  ...config.firebase.options,
})

export const database = getDatabase(app)

window.FIREBASE_APPCHECK_DEBUG_TOKEN = true

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(config.firebase.recaptcahV3Key),
  isTokenAutoRefreshEnabled: true,
})

export const useFirebaseStore = defineStore('firebase', () => {
  const saveProject = async() => {
    const id = nanoid(9)

    await set(ref(database, `projects/${id}`), {
      files: filesystem.exportFiles(true),
      // packages,
    })

    return id
  }

  const loadProject = async(id: string) => {
    const project = await get(ref(database, `projects/${id}`))

    if (project.exists()) {
      console.log(project.toJSON())
      filesystem.importFiles(Object.values(project.toJSON().files))
    }

    return project.toJSON()
  }

  return {
    saveProject,
    loadProject,
  }
})
