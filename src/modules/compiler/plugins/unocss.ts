import { createGenerator, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { transformDirectives } from '@unocss/transformer-directives'
import MagicString from 'magic-string'
import { defineCSSProcessorPlugin } from './types'

const uno = createGenerator({
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify/json/json/carbon.json').then(i => i.default as any),
        mdi: () => import('@iconify/json/json/mdi.json').then(i => i.default as any),
        logos: () => import('@iconify/json/json/logos.json').then(i => i.default as any),
        twemoji: () => import('@iconify/json/json/twemoji.json').then(i => i.default as any),
        ri: () => import('@iconify/json/json/ri.json').then(i => i.default as any),
        tabler: () => import('@iconify/json/json/tabler.json').then(i => i.default as any),
        uim: () => import('@iconify/json/json/uim.json').then(i => i.default as any),
      },
    }),
  ],
})

export const unocssPlugin = defineCSSProcessorPlugin(async({ css, html }) => {
  let output = css || ''

  if (css) {
    const input = new MagicString(css)
    await transformDirectives(input, uno)
    output += input.toString()
  }

  if (html)
    output += (await uno.generate(html)).css

  return output
})
