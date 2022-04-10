export interface PacakgesConfig {
  cdn: string
  defaultPackages?: Record<string, string>
}

export interface PlaygroundPackage {
  name: string
  version: string
  types: string
  entry: string
}

export interface PackageMetadata {
  name: string
  version: string
  main: string
  types: string
  module: string
  dependencies: Record<string, string>
}

export interface PacakgeVersions {
  tags: Record<string, string>
  versions: string[]
}
