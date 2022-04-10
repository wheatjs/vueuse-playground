import { createSingletonPromise } from '@vueuse/core'

/**
 * Creates workers the monaco editor needs to load.
 */
export const createWorkers = createSingletonPromise(async() => {
  return await Promise.all([

    (async() => {
      const [
        { default: EditorWorker },
        { default: TsWorker },
        { default: JsonWorker },
        { default: CssWorker },
        { default: HtmlWorker },
      ] = await Promise.all([
        import('monaco-editor/esm/vs/editor/editor.worker?worker'),
        import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'),
        import('monaco-editor/esm/vs/language/json/json.worker?worker'),
        import('monaco-editor/esm/vs/language/css/css.worker?worker'),
        import('monaco-editor/esm/vs/language/html/html.worker?worker'),
      ])

      // @ts-expect-error Define MonacoEnviornment
      window.MonacoEnvironment = {
        getWorker(_: any, label: string) {
          if (label === 'typescript' || label === 'javascript')
            return new TsWorker()
          if (label === 'json')
            return new JsonWorker()
          if (label === 'css')
            return new CssWorker()
          if (label === 'html')
            return new HtmlWorker()

          return new EditorWorker()
        },
      }
    })(),

  ])
})

/**
 * Imports the monaco editor. We want to defer this to speed up the initial load.
 */
export const useMonacoImport = createSingletonPromise(async() => {
  if (typeof window !== 'undefined')
    return await import('monaco-editor')
})
