import type { UserConfig } from 'unocss'
import { createGenerator } from 'unocss'
import { transformDirectives } from '@unocss/transformer-directives'
import MagicString from 'magic-string'
import { defineCSSProcessorPlugin } from './types'
import type { UnoConfigFile } from '~/modules/project'
import { useProjectStore } from '~/modules/project'

const uno = createGenerator({})

export const unocssPlugin = defineCSSProcessorPlugin(async({ css, html, js }) => {
  let output = css || ''
  const project = useProjectStore()
  const configFile = project.files['unocss.config.ts'] as UnoConfigFile

  if (configFile) {
    const config = configFile.compiled.config as UserConfig

    if (config) {
      uno.setConfig(config)

      if (css && config.transformers?.some(x => x.name === 'css-directive')) {
        const input = new MagicString(css)
        await transformDirectives(input, uno, {})
        output += input.toString()
      }

      if (html)
        output += (await uno.generate(html)).css

      if (js)
        output += (await uno.generate(js)).css
    }
  }

  return output
})
