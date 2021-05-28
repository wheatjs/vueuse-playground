import { watch, Ref, unref } from 'vue'
import { createEventHook, tryOnUnmounted } from '@vueuse/core'
import darktheme from 'theme-vitesse/themes/vitesse-dark.json'
import lightTheme from 'theme-vitesse/themes/vitesse-light.json'
import setupMonaco from '../logic/editor'
import { isDark } from '../logic/dark'

export function useMonaco(target: Ref, options: any) {
  const changeEventHook = createEventHook<string>()

  const init = async() => {
    const { monaco } = await setupMonaco()
    // @ts-expect-error
    monaco.editor.defineTheme('vitesse-dark', darktheme)
    // @ts-expect-error
    monaco.editor.defineTheme('vitesse-light', lightTheme)
  
    const stop = watch(target, () => {
      const el = unref(target)
  
      if (!el)
        return
  
      const extension = () => {
        if (options.language === 'typescript')
          return 'ts'
        else if (options.language === 'javascript')
          return 'js'
        else if (options.language === 'html')
          return 'html'
      }

      const model = monaco.editor.createModel(options.code, options.language, monaco.Uri.parse(`file:///root/${Date.now()}.${extension()}`))
      const editor = monaco.editor.create(el, {
        model,
        tabSize: 2,
        insertSpaces: true,
        autoClosingQuotes: 'always',
        detectIndentation: false,
        folding: false,
        automaticLayout: true,
        theme: 'vitesse-dark',
        minimap: {
          enabled: false,
        },
      })

      watch(isDark, () => {
        if (isDark.value)
          monaco.editor.setTheme('vitesse-dark')
        else
          monaco.editor.setTheme('vitesse-light')
      }, { immediate: true })
  
      editor.getModel()?.onDidChangeContent(e => changeEventHook.trigger(editor.getValue()))
    }, {
      flush: 'post',
      immediate: true,
    })

  }

  init()

  tryOnUnmounted(() => stop())

  return {
    onChange: changeEventHook.on,
  }
}
