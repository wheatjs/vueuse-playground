export interface PacakgesConfig {
  cdn: string
  defaultPackages?: Record<string, string>
}

export interface PlaygroundPackage {
  id: string
  name: string
  version: string
  description?: string
  homepage?: string
  types: string
  entry: string
}

export interface PackageMetadata {
  name: string
  version: string
  main: string
  types: string
  module: string
  description?: string
  homepage?: string
  dependencies: Record<string, string>
}

export interface PacakgeVersions {
  tags: Record<string, string>
  versions: string[]
}
