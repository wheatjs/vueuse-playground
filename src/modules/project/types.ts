import type { BaseFile } from './files'

export interface PackageConfig {
  cdn: string
  redirects: Record<string, string>
}

export interface ProjectConfig {
  packages: PackageConfig
}

export interface ExportedProjectFile extends BaseFile {
  content: string
}

export interface ProjectSolution {
  name?: string
  description?: string
  defaultFile?: string
  files: ExportedProjectFile[]
  packages: Record<string, string>
}
