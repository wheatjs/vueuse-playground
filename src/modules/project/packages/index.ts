import { customAlphabet } from 'nanoid'
import type { PackageJson } from 'type-fest'
import config from '@playground/config'
import { compare } from 'semver'
import type { Package } from './types'

const VERSION_DATA_URL = 'https://data.jsdelivr.com/v1/package/npm/'
const url = (path: string) => `${config.project.packages.cdn}${path}`
const version = (path: string) => `${VERSION_DATA_URL}${path}`

export async function resolvePackageJson(name: string, version?: string): Promise<PackageJson> {
  const response = await fetch(url(`${name}${version ? `@${version}` : ''}/package.json`))

  if (!response.ok)
    return new Error('Error Resolving Package Data')

  return await response.json()
}

export async function resolvePackageTypes(pkg: PackageJson): Promise<string | undefined> {
  const types = pkg.types || pkg.typings

  if (!types)
    return undefined

  const response = await fetch(url(`${pkg.name}@${pkg.version}/${types}`))

  if (!response.ok)
    return undefined

  return await response.text()
}

export async function resolvePackage(name: string, version?: string): Promise<Package[] | undefined> {
  const resolvedPackages: Package[] = []

  const packageJson = await resolvePackageJson(name, version)
  const packageTypes = await resolvePackageTypes(packageJson)
  const packageDependencies = Object.entries(packageJson.dependencies || {})

  ;(await Promise.allSettled(packageDependencies.map(([name, version]) => resolvePackage(name, version))))
    .filter((result): result is PromiseFulfilledResult<Package[]> => result.status === 'fulfilled')
    .map(result => result.value)
    .forEach(pkg => resolvedPackages.push(...pkg))

  resolvedPackages.push({
    id: customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)(),
    name,
    version: packageJson.version || 'latest',
    metadata: packageJson,
    types: packageTypes,
  })

  return resolvedPackages
}

export function prunePackages(packages: Package[]) {
  return packages
    .filter((_package, index) => {
      const shouldSkip = packages.some((p, _index) => {
        if (p.name === _package.name) {
          if (index !== _index)
            return compare(_package.version, p.version) < 0
        }

        return false
      })

      return !shouldSkip
    })
    .filter((p, i) => packages.findIndex(({ name }) => name === p.name) === i)
}

export async function getPackageVersions(name: string) {
  const response = await fetch(version(name))

  if (!response.ok)
    return new Error('Error Resolving Package Versions')

  return await response.json()
}
