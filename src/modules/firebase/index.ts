import { initializeApp } from 'firebase/app'
import type { User } from 'firebase/auth'
import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

// import { get, getDatabase, ref, set } from 'firebase/database'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import config from '@playground/config'
import { nanoid } from 'nanoid'

export * from './types'

export const app = initializeApp({
  ...config.firebase.options,
})

// export const database = getDatabase(app)

window.FIREBASE_APPCHECK_DEBUG_TOKEN = true

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(config.firebase.recaptcahV3Key),
  isTokenAutoRefreshEnabled: true,
})

export const useFirebaseStore = defineStore('firebase', () => {
  const user = ref<User | null>()
  const auth = getAuth()
  const isAuthenticated = computed(() => !!user.value)

  auth.onIdTokenChanged(u => user.value = u)

  const signIn = async () => {
    signInWithPopup(auth, new GithubAuthProvider())
  }

  const signOut = async () => {
    auth.signOut()
  }

  return {
    user,
    isAuthenticated,

    signIn,
    signOut,
  }
})

// export const useFirebaseStore = defineStore('firebase', () => {
//   const saveProject = async() => {
//     // const id = nanoid(9)

//     // await set(ref(database, `projects/${id}`), {
//     //   files: filesystem.exportFiles(true),
//     //   // packages,
//     // })

//     // return id
//   }

//   const loadProject = async(id: string) => {
//     // const project = await get(ref(database, `projects/${id}`))

//     // if (project.exists() && 'files' in project.toJSON())
//     //   filesystem.importFiles(Object.values(project.toJSON().files) as ExportedFile[])

//     // return project.toJSON()
//   }

//   return {
//     saveProject,
//     loadProject,
//   }
// })
