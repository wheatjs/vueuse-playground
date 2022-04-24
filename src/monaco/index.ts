import { createSingletonPromise } from '@vueuse/core'
import config from '@playground/config'
import { MonacoThemes } from './themes'
import { createWorkers, useMonacoImport } from './setup'
import { useAppStore } from '~/modules/app'
import { useProjectStore } from '~/modules/project'

export * from './plugins'
export * from './setup'

/**
 * Creates and returns a configured monaco instance.
 */
export const createMonacoInstance = createSingletonPromise(async() => {
  await createWorkers()
  const { emmetHTML } = await import('emmet-monaco-es')
  const monaco = await useMonacoImport()

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
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    noUnusedLocals: false,
    noUnusedParameters: false,
    allowUnreachableCode: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowUnusedLabels: true,
    strict: false,
    importHelpers: true,
    isolatedModules: true,
    noImplicitUseStrict: false,
    target: monaco.languages.typescript.ScriptTarget.ESNext,
  })

  // Ignore specific diagnostic codes.
  monaco?.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    diagnosticCodesToIgnore: [6133, 6198, 8006, 8010, 1208, 2451],
  })

  // Setup package types
  const [
    { default: vueTypes },
    { default: vueSharedTypes },
    { default: vueRuntimeDomTypes },
    { default: vueRuntimeCoreTypes },
    { default: vueReactivityTypes },
    { default: localShims },
  ] = await Promise.all([
    import('vue/dist/vue.d.ts?raw'),
    import('@vue/shared/dist/shared.d.ts?raw'),
    import('@vue/runtime-dom/dist/runtime-dom.d.ts?raw'),
    import('@vue/runtime-core/dist/runtime-core.d.ts?raw'),
    import('@vue/reactivity/dist/reactivity.d.ts?raw'),
    import('../env.d.ts?raw'),
  ])

  const builtinLibs = [
    { content: `declare module '@vue/shared' { ${vueSharedTypes} }` },
    { content: `declare module '@vue/runtime-core' { ${vueRuntimeCoreTypes} }` },
    { content: `declare module '@vue/runtime-dom' { ${vueRuntimeDomTypes} }` },
    { content: `declare module '@vue/reactivity' { ${vueReactivityTypes} }` },
    { content: `declare module 'vue' { ${vueTypes} }` },
    { content: localShims },
  ]

  monaco!.languages.typescript.typescriptDefaults.setExtraLibs([...builtinLibs])

  const project = useProjectStore()
  const globalModules = ['vue-global-api']

  watch(() => [project.files, project.packages], () => {
    const _packages = project.packages
      .filter(({ types }) => types)
      .map(({ name, types }) => {
        if (globalModules.includes(name)) {
          return {
            content: types!,
          }
        }

        return {
          content: `declare module '${name}' { ${types} }`,
        }
      })

    const _vueFiles = Object.values(project.files)
      .filter(({ filename }) => filename !== 'App.vue')
      .filter(({ filename }) => filename.endsWith('.vue'))
      .map(({ filename }) => {
        return {
          content: `declare module './${filename}' {
          import { DefineComponent } from 'vue'
          const component: DefineComponent<{}, {}, any>
          export default component
        }`,
        }
      })

    const _scriptFiles = Object.values(project.files)
      .filter(({ filename }) => filename !== 'main.ts')
      .filter(({ filename }) => filename.endsWith('.ts') || filename.endsWith('.js'))
      .map(({ filename }) => {
        return {
          content: `declare module './${filename}' {}`,
        }
      })

    monaco!.languages.typescript.typescriptDefaults.setExtraLibs([
      ...builtinLibs,
      ..._packages,
      ..._vueFiles,
      ..._scriptFiles,
    ])
  }, { immediate: true })

  // Setup monaco emmet
  emmetHTML(monaco)

  return {
    monaco: monaco!,
  }
})
