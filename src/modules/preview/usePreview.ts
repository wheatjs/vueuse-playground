import type { Ref, WatchStopHandle } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import SourceTemplate from './template.html?raw'
import { PreviewProxy } from './PreviewProxy'
import type { PreviewProxyHandlers } from './PreviewProxy'
import { useAppStore } from '~/modules/app'
import { usePreviewStore } from '~/modules/preview'
import { useProjectStore } from '~/modules/project'
import { TerminalCommandType, sendConsoleCommand, sendTerminalCommand } from '~/modules/terminal'

const defaultVueUrl = import.meta.env.PROD
  ? `${location.origin}/vue.runtime.esm-browser.js` // to be copied on build
  : `${location.origin}/src/vue-dev-proxy`

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
    // sendTerminalCommand({
    //   type: TerminalCommandType.ERROR,
    //   payload: `[App] ${error.value}`,
    // })
    if (error.args)
      sendConsoleCommand(['error', error.value])
  },
  onFetchProgress: () => { },
  onConsole: (x) => {
    console.log(x)
    if (x.args)
      sendConsoleCommand([x.level.replace('system-', ''), ...x.args])
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
          vue: defaultVueUrl,
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

      await proxy.eval([
        `
          window.__modules__ = {}
          window.__css__ = ''
          if (window.__app__ && 'unmount' in window.__app__) {
            try {
              window.__app__.unmount()
              document.getElementById('app').innerHTML = ''
              window.__app__ = null
            } catch(e) {
              console.log('[App] Could not unmount app', e)
            }
          }
        `,
        app.isDark ? 'document.querySelector("html").classList.add("dark")' : 'document.querySelector("html").classList.remove("dark")',
        ...project.modules.styles.map((style) => {
          return `window.__css__ += \`${style.replace(/\\/g, '\\\\')}\``
        }),
        `
          ${project.modules.scripts[0]}
          window.__app__ = app
          document.getElementById('__sfc-styles').innerHTML = window.__css__
        `,
      ])
    }
    catch (error) {
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

      ; ({ off: stopUpdateWatcher } = project.onFilesCompiled(() => {
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
