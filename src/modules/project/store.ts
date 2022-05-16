import config from '@playground/config'
import type { ProjectSolutionPreset } from 'presets/types'
import { prunePackages, resolvePackage } from './packages'

import { BaseFile, CssFile, SFCFile, ScriptFile } from './files'
import type { Package } from './packages/types'
import type { ProjectSolution } from './types'
import { useEditorStore } from '~/modules/editor'
import { usePreviewStore } from '~/modules/preview'
import { createWorkers } from '~/modules/editor/monaco'
import { build, disposeEsbuild } from '~/modules/esbuild'

export * from './packages/types'

export const url = (p: Package) => `${config.project.packages.cdn}${p.name}@${p.version}/${p.metadata.module || p.metadata.main}`
export const urlBase = (p: Package) => `${config.project.packages.cdn}${p.name}@${p.version}/`

export const useProjectStore = defineStore('project', () => {
  const editor = useEditorStore()
  const preview = usePreviewStore()
  const { previewUpdateDelay } = storeToRefs(preview)

  const isNewProjectDialogOpen = ref(false)
  const isOpenDemoDialogOpen = ref(false)
  const isPackageManagerDialogOpen = ref(false)

  const importStatus = ref({
    installingPackages: false,
    compiling: false,
  })

  const isCreatingProject = ref(false)
  const isAddingPackages = ref(false)

  const files = shallowRef<Record<string, BaseFile>>({})
  const modules = ref<{ scripts: string[]; styles: string[] }>({ scripts: [], styles: [] })
  const basePackages = ref<Package[]>([])
  const packages = ref<Package[]>([])

  const onFileCreatedHook = createEventHook<string>()
  const onFileDeletedHook = createEventHook<string>()
  const onFilesCompiledHook = createEventHook<void>()

  const onPackageAddedHook = createEventHook<string[]>()
  const onPackageRemovedHook = createEventHook<string>()

  /**
   * Compile a project file
   */
  const compileFile = async (filename?: string, silent?: boolean) => {
    if (filename && files.value[filename].readOnly)
      return

    try {
      const { outputFiles } = await build(files.value, packages.value)

      if (outputFiles && outputFiles.length > 0) {
        modules.value = {
          scripts: outputFiles.filter(f => f.path.endsWith('.js')).map(f => f.text),
          styles: outputFiles.filter(f => f.path.endsWith('.css')).map(f => f.text),
        }

        if (!silent)
          onFilesCompiledHook.trigger()
      }
    }
    catch (error) {

    }
  }

  /**
   * Creates a new project file
   */
  const createFile = async (file: BaseFile, silent?: boolean) => {
    await import('monaco-editor')
    await createWorkers()

    disposeEsbuild()

    const _compile = useDebounceFn(() => compileFile(file.filename), previewUpdateDelay)
    file.onUpdate = () => _compile()
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
    disposeEsbuild()

    const { [filename]: old, ...rest } = files.value
    old.destroy()
    files.value = rest

    onFileDeletedHook.trigger(filename)
  }

  /**
   * Add a new package to the project
   *
   * @param name Package name
   * @param version Package version
   */
  const addPackage = async (pkgs: { name: string; version?: string }[]) => {
    isAddingPackages.value = true

    // Package already suppors modules, so we can skip building it and instead add it to the import map.
    const resolvedPackages = (await Promise.allSettled(pkgs.map(({ name, version }) => resolvePackage(name, version))))
      .filter((result): result is PromiseFulfilledResult<Package[]> => result.status === 'fulfilled')
      .map(result => result.value)
      .flat()

    if (resolvedPackages) {
      packages.value = prunePackages([...resolvedPackages, ...packages.value])
      basePackages.value = prunePackages([...resolvedPackages.filter(x => pkgs.some(y => y.name === x.name)), ...basePackages.value])
    }

    disposeEsbuild()

    isAddingPackages.value = false
    onPackageAddedHook.trigger(pkgs.map(({ name }) => name))
  }

  const packageImportMap = computed(() => {
    return packages.value
      .filter(pkg => pkg.supportsEsm)
      .reduce((acc: Record<string, string>, pkg) => {
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
  const importProject = async (project: ProjectSolutionPreset) => {
    isCreatingProject.value = true
    clearProject()

    await Promise.all(project.files.map((file) => {
      if (file.filename.endsWith('.vue'))
        return createFile(new SFCFile(file))
      else if (file.filename.endsWith('.ts') || file.filename.endsWith('.js'))
        return createFile(new ScriptFile(file))
      else if (file.filename.endsWith('.css'))
        return createFile(new CssFile(file))
      else if (file.filename.endsWith('.json'))
        return createFile(new BaseFile(file))

      return null
    }))

    importStatus.value = { compiling: false, installingPackages: true }

    await addPackage(Object.entries(project.packages).map(([name, version]) => ({ name, version })))
      .then(() => {
        importStatus.value = { compiling: true, installingPackages: false }

        return Promise.all(project.files.map(file => compileFile(file.filename, true)))
          .then(() => {
            importStatus.value = { compiling: false, installingPackages: false }
            onFilesCompiledHook.trigger()
          })
      })

    setTimeout(() => {
      onFileCreatedHook.trigger('')
    }, 10)

    /**
     * Set the project current file. First check if the url file query exsists and the file exists.
     */
    const query = new URLSearchParams(window.location.search)
    const _file = query.has('file') && query.get('file')

    if (files.value[_file as string])
      editor.currentFilename = _file as string
    else if (project.defaultFile)
      editor.currentFilename = project.defaultFile

    isCreatingProject.value = false
  }

  /**
   * Exports the existing project
   */
  const exportProject = (): ProjectSolution => {
    return {
      defaultFile: editor.currentFilename,
      files: Object.values(files.value)
        .filter(f => !f.readOnly)
        .map(file => ({
          filename: file.filename,
          dir: file.dir,
          content: file.toString(),
          ...(file.exportDocuments() as any),
        })),
      packages: Object.values(basePackages.value).reduce((acc: Record<string, string>, pkg) => {
        acc[pkg.name] = pkg.version
        return acc
      }, {}),
    }
  }

  /**
   * Open VueUse function demo
   */
  const openDemo = async (demo: string) => {
    isCreatingProject.value = true
    const demoPreset = await import('~/../presets/demo')
    const demos = await import('~/../demos')
    const demoEntry = demos.default.find(x => x.name === demo)

    if (demoEntry) {
      const files = await demoEntry.files()

      const extraFiles = demoPreset.default.extraFiles
        ? demoPreset.default.extraFiles.filter((f) => {
          if (demoEntry.includeUtils && f.filename === 'utils.ts')
            return true

          if (demoEntry.includeComponents.length > 0) {
            for (const entry of demoEntry.includeComponents) {
              if (f.filename.toLowerCase().includes(entry.toLowerCase()))
                return true
            }
          }

          return false
        })
        : []

      importProject({
        ...demoPreset.default,
        files: [
          ...demoPreset.default.files.map((f) => {
            if (f.filename !== 'main.ts')
              return f

            let content = (f as any).script as string
            const imps = extraFiles.filter(f => f.filename !== 'utils.ts').map(f => ({ name: f.filename.split('.')[0], path: `./${f.filename}` }))

            content = content.replace('// EXTRA_IMPORTS', `\n${imps.map(({ name, path }) => `import ${name} from '${path}'`).join('\n')}`)
            content = content.replace('// EXTRA_APP_MODIFICATIONS', `\n${imps.map(({ name }) => `app.component('${name}', ${name})`).join('\n')}`)

            return {
              ...f,
              script: content,
            }
          }),
          ...files.default.map(x => ({ ...x, dir: 'src/' })),
          ...extraFiles,
        ],
        packages: {
          ...demoPreset.default.packages,
          ...(demoEntry.extraDependencies as unknown as Record<string, string>),
        },
      })
    }
  }

  return {
    files,
    basePackages,
    packages,
    modules,

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

    importStatus,

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
