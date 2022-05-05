import type { Ref, WatchStopHandle } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import SourceTemplate from './template.html?raw'
import { PreviewProxy } from './PreviewProxy'
import type { PreviewProxyHandlers } from './PreviewProxy'
import { useAppStore } from '~/modules/app'
import { usePreviewStore } from '~/modules/preview'
import { useProjectStore } from '~/modules/project'
import { compileFilesAsModules, vueRuntimeUrl } from '~/modules/compiler'
import { TerminalCommandType, sendTerminalCommand } from '~/modules/terminal'
import type { BaseFile, ScriptFile } from '~/modules/project'

const forcePreivewUpdateHook = createEventHook()
export const forcePreviewUpdate = forcePreivewUpdateHook.trigger
export const onForcePreviewUpdate = forcePreivewUpdateHook.on

export const previewUpdateDelay = ref(0)
export const previewStatus = ref({
  isCompiling: false,
  didCompileSuccessfully: false,
  hasErrors: false,
})

const defaultHandlers: PreviewProxyHandlers = {
  onError: (error) => {
    sendTerminalCommand({
      type: TerminalCommandType.ERROR,
      payload: `[App] ${error.value}`,
    })
  },
  onFetchProgress: () => { },
  onConsole: (x) => {
    sendTerminalCommand({
      type: TerminalCommandType.WARN,
      payload: x.args.join(' '),
    })
  },
  onUnhandledRejection: () => { },
  onConsoleGroup: () => { },
  onConsoleGroupCollapsed: () => { },
  onConsoleGroupEnd: () => { },
}

export interface UsePreviewOptions {
  handlers?: PreviewProxyHandlers
  srcTemplate?: string
  importMap?: MaybeRef<Record<string, string>>
  styles?: MaybeRef<string>
}

export function usePreview(target: Ref<HTMLElement | undefined>, options: UsePreviewOptions = {}) {
  const app = useAppStore()
  const project = useProjectStore()
  const preview = usePreviewStore()

  const { previewUpdateDelay } = storeToRefs(preview)

  const {
    handlers = defaultHandlers,
    srcTemplate = SourceTemplate,
    importMap = computed(() => {
      return {
        imports: {
          ...project.packageImportMap,
          vue: vueRuntimeUrl.value,
        },
      }
    }),
    styles = '',
  } = options

  let sandbox: HTMLIFrameElement
  let proxy: PreviewProxy
  let stopUpdateWatcher: WatchStopHandle

  const updatePreview = useDebounceFn(async () => {
    try {
      if (Object.values(project.files).length === 0)
        return

      const mainFile = project.files['main.ts'] as ScriptFile

      previewStatus.value.isCompiling = true
      const modules = await compileFilesAsModules({ main: mainFile }, project.files as Record<string, BaseFile>, project.packages)
      previewStatus.value.isCompiling = false
      previewStatus.value.didCompileSuccessfully = true
      previewStatus.value.hasErrors = false

      await proxy.eval([
        `
          window.__modules__ = {}
          window.__css__ = ''
          if (window.__app__) {
            window.__app__.unmount()
            document.getElementById('app').innerHTML = ''
          }
        `,
        app.isDark ? 'document.querySelector("html").classList.add("dark")' : 'document.querySelector("html").classList.remove("dark")',
        ...modules,
        `
        const mainApp = __modules__['${mainFile.filename}']
        
        setTimeout(() => {
            
            if (mainApp && mainApp.app) {
              window.__app__ = mainApp.app
            }
            document.getElementById('__sfc-styles').innerHTML = window.__css__
          }, 0)
        `,
      ])
    }
    catch (error) {
      console.error(error)
      if (error instanceof Error) {
        sendTerminalCommand({
          type: TerminalCommandType.ERROR,
          payload: [`[Compiler]: ${error.message}`],
        })
      }
    }
  }, previewUpdateDelay)

  const destroySandbox = () => {
    if (sandbox && proxy) {
      proxy.destroy()

      if (stopUpdateWatcher)
        stopUpdateWatcher()

      if (target.value)
        target.value.removeChild(sandbox)
    }
  }

  const createSandbox = () => {
    destroySandbox()

    sandbox = document.createElement('iframe')
    sandbox.srcdoc = srcTemplate
      .replace(/<html>/, app.isDark ? '<html class="dark">' : '<html>')
      .replace(/<!--IMPORT_MAP-->/, JSON.stringify(unref(importMap)))
      .replace(/<!--INJECT_STYLES-->/, `<style>${unref(styles)}</style>`)

    sandbox.setAttribute('sandbox', [
      'allow-scripts',
      'allow-same-origin',
      'allow-forms',
      'allow-popups',
      'allow-modals',
      'allow-orientation-lock',
      'allow-pointer-lock',
      'allow-top-navigation-by-user-activation',
    ].join(' '))
    sandbox.setAttribute('allowTransparency', 'true')

    proxy = new PreviewProxy(sandbox, handlers)

    sandbox.addEventListener('load', () => {
      proxy.handle_links()

      ;({ off: stopUpdateWatcher } = project.onFilesCompiled(() => {
        updatePreview()
      }))

      updatePreview()
    })

    if (target.value)
      target.value.appendChild(sandbox)
  }

  watch(() => [unref(target), unref(importMap), unref(styles)], () => createSandbox())
  watch(() => [app.isDark], updatePreview)

  return {
    createSandbox,
    destroySandbox,
    updatePreview,
  }
}
