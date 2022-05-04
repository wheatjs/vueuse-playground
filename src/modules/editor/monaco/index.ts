import { createSingletonPromise } from '@vueuse/core'
import config from '@playground/config'
import { setupTypeAcquisition } from '@typescript/ata'
import { useEditorStore } from '../store'
import { MonacoThemes } from './themes'
import { createWorkers } from './setup'
import { createFakeTs } from './typescript/fake-ts'
import { useAppStore } from '~/modules/app'
import type { ScriptFile } from '~/modules/project'
import { useProjectStore } from '~/modules/project'

export * from './plugins'
export * from './setup'

/**
 * Creates and returns a configured monaco instance.
 */
export const createMonacoInstance = createSingletonPromise(async() => {
  await createWorkers()
  const { emmetHTML } = await import('emmet-monaco-es')
  const monaco = await import('monaco-editor')

  // We need to import this module to make ts available in the global scope.
  const ts = await createFakeTs()
  const app = useAppStore()

  // Setup defaults themes for monaco
  Object.entries(MonacoThemes).forEach(([name, theme]) => {
    if (monaco)
      monaco.editor.defineTheme(name, theme as any)
  })

  if (monaco) {
    monaco.editor.defineTheme('Dark', config.editor.theme.dark)
    monaco.editor.defineTheme('Light', config.editor.theme.light)
  }

  // Watch for theme changes
  watch(() => app.isDark, () => {
    if (app.isDark)
      monaco?.editor.setTheme('Dark')
    else
      monaco?.editor.setTheme('Light')
  })

  // Configure monaco typescript
  monaco?.languages.typescript.typescriptDefaults.setCompilerOptions({
    strict: true,

    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: true,
    strictBindCallApply: true,
    noImplicitThis: true,
    noImplicitReturns: true,
    noUncheckedIndexedAccess: false,

    useDefineForClassFields: false,

    alwaysStrict: true,
    allowUnreachableCode: false,
    allowUnusedLabels: false,

    downlevelIteration: false,
    noEmitHelpers: false,
    noLib: false,
    noStrictGenericChecks: false,
    noUnusedLocals: false,
    noUnusedParameters: false,

    esModuleInterop: true,
    preserveConstEnums: false,
    removeComments: false,
    skipLibCheck: false,

    checkJs: false,
    allowJs: true,
    declaration: true,

    importHelpers: false,

    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,

    target: monaco.languages.typescript.ScriptTarget.ESNext,
    module: monaco.languages.typescript.ModuleKind.ESNext,

    isolatedModules: true,
  })

  const project = useProjectStore()
  const editorStore = useEditorStore()
  const defaults = monaco?.languages.typescript.typescriptDefaults

  // Ignore specific diagnostic codes.
  monaco?.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    diagnosticCodesToIgnore: [6133, 6198, 8006, 8010, 1208, 2451, 2307],
  })

  let acquiredTypes: Record<string, string> = {}

  const updateTypeDefinitions = async() => {
    const localScriptFiles = Object.values(project.files)
      .filter((f): f is ScriptFile => f.filename.endsWith('.ts'))
      .map(f => ({ content: `declare module './${f.filename}' { ${f.compiled.dts} }` }))

    const localVueFiles = Object.values(project.files)
      .filter((f): f is ScriptFile => f.filename.endsWith('.vue'))
      .map(f => ({
        content: `
        declare module './${f.filename}.ts' {
          import { DefineComponent } from 'vue'
          const component: DefineComponent<{}, {}, any>
          export default component
        }`,
      }))

    const extraLibs = Object.entries(acquiredTypes).map(([name, content]) => ({ filePath: `file://${name}`, content }))

    defaults?.setExtraLibs([
      ...extraLibs,
      ...localScriptFiles,
      ...localVueFiles,
    ])
  }

  watch(() => editorStore.currentFilename, () => {
    updateTypeDefinitions()
  })

  const ata = setupTypeAcquisition({
    projectName: 'VueUse Playground',
    typescript: (ts as any),
    logger: console,
    delegate: {
      // receivedFile: addLibraryToRuntime,
      started() {
        editorStore.isAcquiringTypeDefinitions = true
      },
      finished(files) {
        acquiredTypes = { ...acquiredTypes, ...Object.fromEntries(files) }
        updateTypeDefinitions()
        editorStore.isAcquiringTypeDefinitions = false
      },
    },
  })

  const doGetTypesFromPackages = () => {
    const packages = Object.values(project.basePackages)
    let code = packages.map(pkg => `import {} from '${pkg.name}'`).join('\n')

    if (config.editor.extraTypes)
      code += `\n${config.editor.extraTypes.map(pkg => `import {} from '${pkg}'`).join('\n')}`

    ata(code)
  }

  project.onPackageAdded(() => {
    doGetTypesFromPackages()
  })
  doGetTypesFromPackages()

  // Setup monaco emmet
  emmetHTML(monaco)

  return {
    monaco: monaco!,
  }
})
