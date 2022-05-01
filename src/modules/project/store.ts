import config from '@playground/config'
import type { ProjectSolutionPreset } from 'presets/types'
import { prunePackages, resolvePackage } from './packages'

import { BaseFile, CssFile, SFCFile, ScriptFile } from './files'
import type { Package } from './packages/types'
import DefaultPreset from '~/../presets/default'
import { useEditorStore } from '~/modules/editor'
import { createMonacoInstance, createWorkers } from '~/modules/editor/monaco'
import DemoCss from '~/../demos/shared.css?raw'
import DocsUtils from '~/../demos/docs-utils?raw'

const url = (p: Package) => `${config.project.packages.cdn}${p.name}@${p.version}/${p.metadata.module || p.metadata.main}`

export const useProjectStore = defineStore('project', () => {
  const editor = useEditorStore()

  const isNewProjectDialogOpen = ref(false)
  const isOpenDemoDialogOpen = ref(false)
  const isPackageManagerDialogOpen = ref(false)

  const isCreatingProject = ref(false)
  const isAddingPackages = ref(false)

  const files = shallowRef<Record<string, BaseFile>>({})
  const packages = ref<Package[]>([])

  const onFileCreatedHook = createEventHook<string>()
  const onFileDeletedHook = createEventHook<string>()
  const onFilesCompiledHook = createEventHook<void>()

  const onPackageAddedHook = createEventHook<string[]>()
  const onPackageRemovedHook = createEventHook<string>()

  /**
   * Compile a project file
   */
  const compileFile = async(filename?: string, silent?: boolean) => {
    await createWorkers()
    await createMonacoInstance()

    return new Promise<void>((resolve) => {
      setTimeout(async() => {
        if (filename)
          await files.value[filename].compile()

        if (!silent)
          onFilesCompiledHook.trigger()

        resolve()
      }, 0)
    })
  }

  /**
   * Creates a new project file
   */
  const createFile = (file: BaseFile, silent?: boolean) => {
    file.onUpdate = () => compileFile(file.filename)
    files.value = {
      ...files.value,
      [file.filename]: file,
    }

    setTimeout(() => {
      if (!silent)
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
  const addPackage = async(pkgs: { name: string; version?: string }[]) => {
    isAddingPackages.value = true

    const resolvedPackages = (await Promise.allSettled(pkgs.map(({ name, version }) => resolvePackage(name, version))))
      .filter((result): result is PromiseFulfilledResult<Package[]> => result.status === 'fulfilled')
      .map(result => result.value)
      .flat()

    if (resolvedPackages)
      packages.value = prunePackages([...resolvedPackages, ...packages.value])

    isAddingPackages.value = false
    onPackageAddedHook.trigger(pkgs.map(({ name }) => name))
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
    editor.currentFilename = ''
    Object.values(files.value).forEach(file => file.destroy())

    packages.value = []
    files.value = {}

    onFileDeletedHook.trigger('')
  }

  /**
   * Imports a project
   *
   * @param project The project to import
   */
  const importProject = async(project: ProjectSolutionPreset) => {
    isCreatingProject.value = true
    clearProject()

    project.files.forEach((file) => {
      if (file.filename.endsWith('.vue'))
        createFile(new SFCFile(file))
      else if (file.filename.endsWith('.ts') || file.filename.endsWith('.js'))
        createFile(new ScriptFile(file))
      else if (file.filename.endsWith('.css'))
        createFile(new CssFile(file))
      else if (file.filename.endsWith('.json'))
        createFile(new BaseFile(file))
    })

    await Promise.all([
      addPackage(Object.entries(project.packages).map(([name, version]) => ({ name, version }))),
      ...project.files.map(file => compileFile(file.filename, true)),
    ])

    setTimeout(() => {
      onFileCreatedHook.trigger('')
      onFilesCompiledHook.trigger()
    }, 10)

    if (project.defaultFile)
      editor.currentFilename = project.defaultFile

    isCreatingProject.value = false
  }

  /**
   * Exports the existing project
   */
  const exportProject = () => {}

  /**
   * Open VueUse function demo
   */
  const openDemo = async(demo: string) => {
    isCreatingProject.value = true
    const demos = await import('~/../demos')
    const demoEntry = demos.default.find(x => x.name === demo)

    if (demoEntry) {
      const _files = await demoEntry.files()

      importProject({
        ...DefaultPreset,
        files: [
          ...DefaultPreset.files.filter(f => f.filename !== 'App.vue' && f.filename !== 'main.css'),
          {
            filename: 'main.css',
            initialStyleContent: DemoCss,
            hide: true,
            isProtected: true,
          },
          ..._files.default.map(file => ({
            filename: file.name === 'demo.vue' ? 'App.vue' : file.name,
            isProtected: file.name === 'demo.vue',
            initialScriptContent: file.scriptContent?.replaceAll('@vueuse/docs-utils', './utils'),
            initialTemplateContent: file.templateContent,
          })),
          {
            filename: 'utils.ts',
            initialScriptContent: DocsUtils,
          },
        ],
        packages: {
          ...DefaultPreset.packages,
          'js-yaml': 'latest',
        },
      })
    }
  }

  return {
    files,
    packages,

    isCreatingProject: readonly(isCreatingProject),
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

    openDemo,

    isOpenDemoDialogOpen,
    isNewProjectDialogOpen,
    isPackageManagerDialogOpen,

    // Event Hooks
    onFileCreated: onFileCreatedHook.on,
    onFileDeleted: onFileDeletedHook.on,
    onFilesCompiled: onFilesCompiledHook.on,

    onPackageAdded: onPackageAddedHook.on,
    onPackageRemoved: onPackageRemovedHook.on,
  }
})
