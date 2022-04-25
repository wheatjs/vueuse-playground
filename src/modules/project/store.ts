import config from '@playground/config'
import { prunePackages, resolvePackage } from './packages'

import type { BaseFile } from './files'
import type { Package } from './packages/types'
import type { ProjectSolution } from './types'
import { useEditorStore } from '~/modules/editor'

const url = (p: Package) => `${config.project.packages.cdn}${p.name}@${p.version}/${p.metadata.module || p.metadata.main}`

export const useProjectStore = defineStore('project', () => {
  const editor = useEditorStore()

  const isAddingPackages = ref(false)

  const files = shallowRef<Record<string, BaseFile>>({})
  const packages = ref<Package[]>([])

  const onFileCreatedHook = createEventHook<string>()
  const onFileDeletedHook = createEventHook<string>()
  const onFilesCompiledHook = createEventHook<void>()

  const onPackageAddedHook = createEventHook<string>()
  const onPackageRemovedHook = createEventHook<string>()

  /**
   * Compile a project file
   */
  const compileFile = async(filename?: string) => {
    if (filename)
      await files.value[filename].compile()

    onFilesCompiledHook.trigger()
  }

  /**
   * Creates a new project file
   */
  const createFile = (file: BaseFile) => {
    file.onUpdate = () => compileFile(file.filename)
    files.value = {
      ...files.value,
      [file.filename]: file,
    }

    setTimeout(() => {
      onFileCreatedHook.trigger(file.filename)
    })
  }

  /**
   * Deletes a project file
   */
  const deleteFile = (filename: string) => {
    delete files.value[filename]
    onFileDeletedHook.trigger(filename)
  }

  /**
   * Add a new package to the project
   *
   * @param name Package name
   * @param version Package version
   */
  const addPackage = async(name: string, version?: string) => {
    isAddingPackages.value = true
    const resolvedPackages = await resolvePackage(name, version)

    if (resolvedPackages)
      packages.value = prunePackages(resolvedPackages)

    isAddingPackages.value = false
  }

  const packageImportMap = computed(() => {
    return packages.value.reduce((acc: Record<string, string>, pkg) => {
      acc[pkg.name] = url(pkg)
      return acc
    }, {})
  })

  /**
   * Remove an existing package from the project
   *
   * @param name Package name
   */
  const removePackage = (name: string) => {
    packages.value = packages.value.filter(p => p.name !== name)
  }

  /**
   * Remove all files and packages from the project
   */
  const clearProject = () => {
    packages.value = []
    files.value = {}
  }

  /**
   * Imports a project
   *
   * @param project The project to import
   */
  const importProject = (project: ProjectSolution) => {
    clearProject()
    project.files.forEach((file) => {
      createFile(file)
      compileFile(file.filename)
    })
    Object.entries(project.packages).forEach(([name, version]) => addPackage(name, version))

    if (project.defaultFile)
      editor.currentFilename = project.defaultFile
  }

  /**
   * Exports the existing project
   */
  const exportProject = () => {}

  return {
    files,
    packages,

    isAddingPackages: readonly(isAddingPackages),
    packageImportMap,

    // Methods
    createFile,
    deleteFile,

    compileFile,

    addPackage,
    removePackage,

    importProject,
    exportProject,
    clearProject,

    // Event Hooks
    onFileCreated: onFileCreatedHook.on,
    onFileDeleted: onFileDeletedHook.on,
    onFilesCompiled: onFilesCompiledHook.on,

    onPackageAdded: onPackageAddedHook.on,
    onPackageRemoved: onPackageRemovedHook.on,
  }
})
