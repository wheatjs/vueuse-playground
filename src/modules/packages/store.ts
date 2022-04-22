import config from '@playground/config'

import { compare } from 'semver'
import { watch } from 'vue'
import { resolvePackage, resolvePackageVersions } from './resolver'
import type { PacakgeVersions, PlaygroundPackage } from './types'
import { useStyleSheet } from '~/composables'

const addPackageHook = createEventHook<{ name: string; version?: string; silent?: boolean }>()
const removePackageHook = createEventHook<{ name: string; silent?: boolean }>()

const CDN = config.packages.cdn
const url = (p: PlaygroundPackage) => `${CDN}${p.name}@${p.version}/${p.entry}`

const { rules } = useStyleSheet()

export interface UsePackagesState {
  versions: Record<string, PacakgeVersions>
  packages: PlaygroundPackage[]
  isAcquiringTypes: boolean
  isVersionDialogOpen: boolean
  currentPackageName: string | null
}

export const usePackages = defineStore('packages', () => {
  const packages = ref<PlaygroundPackage[]>([])
  const versions = ref<Record<string, PacakgeVersions>>({})
  const isAcquiringTypes = ref(false)
  const isVersionDialogOpen = ref(false)
  const currentPackageName = ref(null)

  const importMap = computed(() => {
    return `{ "imports": { ${packages.value.map(p => `"${p.name}": "${url(p)}"`).join(',\n')} } }`
  })

  const currentVersions = computed(() => {
    if (currentPackageName.value && currentPackageName.value in versions.value)
      return versions.value[currentPackageName.value]

    return null
  })

  const currentPackage = computed(() => {
    if (currentPackageName.value)
      return packages.value.find(({ name }) => name === currentPackageName.value)

    return null
  })

  const addPackage = async(name: string, version?: string, silent = false) => {
    isAcquiringTypes.value = true

    const pendingPackages = [
      ...packages.value,
      ...await resolvePackage(name, version),
    ]

    packages.value = pendingPackages.filter((_package, index) => {
      const shouldSkip = pendingPackages.some((p, _index) => {
        if (p.name === _package.name) {
          if (index !== _index)
            return compare(_package.version, p.version) < 0
        }

        return false
      })

      return !shouldSkip
    })

    packages.value = packages.value.filter((p, i) => packages.value.findIndex(({ name }) => name === p.name) === i)
    isAcquiringTypes.value = false

    addPackageHook.trigger({
      name,
      version,
      silent,
    })
  }

  const removePackage = async(name: string, silent = false) => {
    packages.value = packages.value.filter(p => p.name !== name)

    removePackageHook.trigger({
      name,
      silent,
    })
  }

  const resolveVersions = async(name: string) => {
    if (name in versions.value)
      return

    versions.value[name] = await resolvePackageVersions(name)
  }

  /**
   * Add CSS class for package version
   */
  watch(packages, () => {
    rules.value = packages.value.reduce((obj, item) => {
      return {
        ...obj,
        [`.editor-decoration-package.package-version-${item.id}::after`]: `content: 'v${item.version}';`,
      }
    }, {})
  })

  return {
    packages,
    versions,
    isAcquiringTypes,
    isVersionDialogOpen,
    currentPackageName,

    importMap,
    currentVersions,
    currentPackage,

    addPackage,
    removePackage,
    resolveVersions,
  }
})

export const onPackageAdded = addPackageHook.on
export const onPackageRemoved = removePackageHook.on
