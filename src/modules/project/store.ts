import config from '@playground/config'
import type { ProjectSolutionPreset } from 'presets/types'
import { prunePackages, resolvePackage } from './packages'

import { BaseFile, CssFile, SFCFile, ScriptFile, UnoConfigFile } from './files'
import type { Package } from './packages/types'
import type { ProjectSolution } from './types'
import { useEditorStore } from '~/modules/editor'
import { usePreviewStore } from '~/modules/preview'
import { createMonacoInstance, createWorkers } from '~/modules/editor/monaco'

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

  const isCreatingProject = ref(false)
  const isAddingPackages = ref(false)

  const files = shallowRef<Record<string, BaseFile>>({})
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
  const compileFile = async(filename?: string, silent?: boolean) => {
    if (filename && files.value[filename].readOnly)
      return

    await createWorkers()
    await createMonacoInstance()
    console.log('compiling file', filename)

    return new Promise<void>((resolve) => {
      setTimeout(async() => {
        if (filename) {
          const file = files.value[filename]
          await file.compile()
        }

        /**
         * TODO: Extract unocss logic into a seperate place outside of the compile logic.
         */
        const uno = Object.values(files.value).find((f): f is CssFile => f.filename === 'uno.css')

        if (uno) {
          let unocss = ''
          for (const file of Object.values(files.value)) {
            if ('uno' in file.compiled)
              unocss += file.compiled.uno
          }
          uno.css.model?.setValue(unocss)
          uno.compiled.css = unocss
        }

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

    if (resolvedPackages) {
      packages.value = prunePackages([...resolvedPackages, ...packages.value])
      basePackages.value = prunePackages([...resolvedPackages.filter(x => pkgs.some(y => y.name === x.name)), ...basePackages.value])
    }

    isAddingPackages.value = false
    onPackageAddedHook.trigger(pkgs.map(({ name }) => name))
  }

  const packageImportMap = computed(() => {
    return packages.value.reduce((acc: Record<string, string>, pkg) => {
      acc[pkg.name] = url(pkg)
      acc[`${pkg.name}/`] = urlBase(pkg)
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
      else if (file.filename === ('unocss.config.ts'))
        createFile(new UnoConfigFile(file))
      else if (file.filename.endsWith('.ts') || file.filename.endsWith('.js'))
        createFile(new ScriptFile(file))
      else if (file.filename.endsWith('.css'))
        createFile(new CssFile(file))
      else if (file.filename.endsWith('.json'))
        createFile(new BaseFile(file))
    })

    await addPackage(Object.entries(project.packages).map(([name, version]) => ({ name, version })))
    await Promise.all(project.files.map(file => compileFile(file.filename, true)))

    setTimeout(() => {
      onFileCreatedHook.trigger('')
      onFilesCompiledHook.trigger()
    }, 0)

    if (project.defaultFile)
      editor.currentFilename = project.defaultFile

    isCreatingProject.value = false
  }

  /**
   * Exports the existing project
   */
  const exportProject = (): ProjectSolution => {
    return {
      defaultFile: editor.currentFilename,
      files: Object.values(files.value).map(file => ({
        filename: file.filename,
        ...(file.exportDocuments() as any),
      })),
      packages: Object.values(packages.value).reduce((acc: Record<string, string>, pkg) => {
        acc[pkg.name] = pkg.version
        return acc
      }, {}),
    }
  }

  /**
   * Open VueUse function demo
   */
  const openDemo = async(demo: string) => {
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
          ...files.default,
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
