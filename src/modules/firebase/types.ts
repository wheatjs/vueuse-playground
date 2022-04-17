import type { FirebaseOptions } from 'firebase/app'

export interface PlagroundFirebaseOptions {
  enabled: boolean
  recaptcahV3Key: string
  options: FirebaseOptions
}
