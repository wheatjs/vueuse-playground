import { customAlphabet } from 'nanoid'
import type { PacakgeVersions, PackageMetadata, PlaygroundPackage } from './types'
import { getDefault } from './defaults'

const CDN = import.meta.env.VITE_PACKAGE_CDN || 'https://unpkg.com/'
const DATA_CDN = import.meta.env.VITE_PACKAGE_DATA_CDN || 'https://data.jsdelivr.com/v1/package/npm/'
const url = (path: string) => `${CDN}${path}`
const dataUrl = (path: string) => `${DATA_CDN}${path}`

/**
 * Resolves the package.json for a package
 *
 * @param name Package name
 * @param version Package version
 */
export async function resolvePackageMetadata(name: string, version: string): Promise<PackageMetadata | Error> {
  const response = await fetch(url(`${name}${version ? `@${version}` : ''}/package.json`))

  if (!response.ok)
    return new Error('Error Resolving Package Data')

  return await response.json() as PackageMetadata
}

/**
 * Resolves the typings for a package.
 *
 * @param metadata
 */
export async function resolvePackageTypes(metadata: PackageMetadata): Promise<string> {
  if (!metadata.types)
    return ''

  const response = await fetch(url(`${metadata.name}@${metadata.version}/${metadata.types}`))

  if (!response.ok)
    return ''

  return await response.text()
}

/**
 * Given a package name, it will resolve the package metadata
 * and type definitions
 *
 * @param name Package name
 */
export async function resolvePackage(name: string, version?: string) {
  /**
   * Start out by resolving the packages metadata
   * then resolve the types for that package.
   *
   * After that resolve this pacakges dependencies
   * via recursion
   */

  const _default = getDefault(name, version)

  const packages: PlaygroundPackage[] = []
  const metadata = await resolvePackageMetadata(_default.name, _default.version || version || '')

  if (!(metadata instanceof Error)) {
    const types = await resolvePackageTypes(metadata)
    const dependencies = Object.entries(metadata.dependencies || []).map(([name, version]) => ({ name, version }))
    const resolvedDeps = await Promise.allSettled(dependencies.map(({ name, version }) => resolvePackage(name, version)))

    packages.push(
      {
        id: customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)(),
        name: metadata.name,
        description: metadata.description,
        homepage: metadata.homepage,
        version: metadata.version,
        entry: _default.entry || metadata.module || metadata.main,
        types,
      },
      ...resolvedDeps
        .filter((result): result is PromiseFulfilledResult<PlaygroundPackage[]> => result.status === 'fulfilled')
        .map(result => result.value)
        .flat(),
    )
  }

  return packages.filter((p, i) => packages.findIndex(x => x.name === p.name) === i)
}

export async function resolvePackageVersions(name: string) {
  const response = await fetch(dataUrl(name))

  if (!response.ok)
    throw new Error('Error Resolving Package Versions')

  return await response.json() as PacakgeVersions
}
