import type { PackageJson } from 'type-fest'

export interface Package {
  id: string
  name: string
  version: string
  metadata: PackageJson
  types?: string
}
