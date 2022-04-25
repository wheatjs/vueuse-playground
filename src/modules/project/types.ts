import type { BaseFile } from './files'

export interface PackageConfig {
  cdn: string
}

export interface ProjectConfig {
  packages: PackageConfig
}

export interface ProjectSolution {
  name?: string
  description?: string
  defaultFile?: string
  files: BaseFile[]
  packages: Record<string, string>
}
