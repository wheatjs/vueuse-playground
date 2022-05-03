import type { UserConfig } from 'unocss'
import { createGenerator, presetIcons } from 'unocss'
import { transformDirectives } from '@unocss/transformer-directives'
import MagicString from 'magic-string'
import { defineCSSProcessorPlugin } from './types'
import type { UnoConfigFile } from '~/modules/project'
import { useProjectStore } from '~/modules/project'

const iconsPreset = presetIcons({
  collections: {
    'ic': () => import('@iconify/json/json/ic.json').then(i => i.default as any),
    'mdi': () => import('@iconify/json/json/mdi.json').then(i => i.default as any),
    'ph': () => import('@iconify/json/json/ph.json').then(i => i.default as any),
    'ri': () => import('@iconify/json/json/ri.json').then(i => i.default as any),
    'carbon': () => import('@iconify/json/json/carbon.json').then(i => i.default as any),
    'bi': () => import('@iconify/json/json/bi.json').then(i => i.default as any),
    'tabler': () => import('@iconify/json/json/tabler.json').then(i => i.default as any),
    'ion': () => import('@iconify/json/json/ion.json').then(i => i.default as any),
    'uil': () => import('@iconify/json/json/uil.json').then(i => i.default as any),
    'teenyicons': () => import('@iconify/json/json/teenyicons.json').then(i => i.default as any),
    'clarity': () => import('@iconify/json/json/clarity.json').then(i => i.default as any),
    'iconoir': () => import('@iconify/json/json/iconoir.json').then(i => i.default as any),
    'majesticons': () => import('@iconify/json/json/majesticons.json').then(i => i.default as any),
    'zondicons': () => import('@iconify/json/json/zondicons.json').then(i => i.default as any),
    'ant-design': () => import('@iconify/json/json/ant-design.json').then(i => i.default as any),
    'bx': () => import('@iconify/json/json/bx.json').then(i => i.default as any),
    'bxs': () => import('@iconify/json/json/bxs.json').then(i => i.default as any),
    'gg': () => import('@iconify/json/json/gg.json').then(i => i.default as any),
    'cil': () => import('@iconify/json/json/cil.json').then(i => i.default as any),
    'lucide': () => import('@iconify/json/json/lucide.json').then(i => i.default as any),
    'pixelarticons': () => import('@iconify/json/json/pixelarticons.json').then(i => i.default as any),
    'system-uicons': () => import('@iconify/json/json/system-uicons.json').then(i => i.default as any),
    'ci': () => import('@iconify/json/json/ci.json').then(i => i.default as any),
    'akar-icons': () => import('@iconify/json/json/akar-icons.json').then(i => i.default as any),
    'typcn': () => import('@iconify/json/json/typcn.json').then(i => i.default as any),
    'radix-icons': () => import('@iconify/json/json/radix-icons.json').then(i => i.default as any),
    'ep': () => import('@iconify/json/json/ep.json').then(i => i.default as any),
    'mdi-light': () => import('@iconify/json/json/mdi-light.json').then(i => i.default as any),
    'fe': () => import('@iconify/json/json/fe.json').then(i => i.default as any),
    'eos-icons': () => import('@iconify/json/json/eos-icons.json').then(i => i.default as any),
    'line-md': () => import('@iconify/json/json/line-md.json').then(i => i.default as any),
    'charm': () => import('@iconify/json/json/charm.json').then(i => i.default as any),
    'prime': () => import('@iconify/json/json/prime.json').then(i => i.default as any),
    'heroicons-outline': () => import('@iconify/json/json/heroicons-outline.json').then(i => i.default as any),
    'heroicons-solid': () => import('@iconify/json/json/heroicons-solid.json').then(i => i.default as any),
    'uiw': () => import('@iconify/json/json/uiw.json').then(i => i.default as any),
    'uim': () => import('@iconify/json/json/uim.json').then(i => i.default as any),
    'uit': () => import('@iconify/json/json/uit.json').then(i => i.default as any),
    'uis': () => import('@iconify/json/json/uis.json').then(i => i.default as any),
    'maki': () => import('@iconify/json/json/maki.json').then(i => i.default as any),
    'gridicons': () => import('@iconify/json/json/gridicons.json').then(i => i.default as any),
    'mi': () => import('@iconify/json/json/mi.json').then(i => i.default as any),
    'quill': () => import('@iconify/json/json/quill.json').then(i => i.default as any),
    'gala': () => import('@iconify/json/json/gala.json').then(i => i.default as any),
    'fluent': () => import('@iconify/json/json/fluent.json').then(i => i.default as any),
    'icon-park-outline': () => import('@iconify/json/json/icon-park-outline.json').then(i => i.default as any),
    'icon-park': () => import('@iconify/json/json/icon-park.json').then(i => i.default as any),
    'vscode-icons': () => import('@iconify/json/json/vscode-icons.json').then(i => i.default as any),
    'jam': () => import('@iconify/json/json/jam.json').then(i => i.default as any),
    'codicon': () => import('@iconify/json/json/codicon.json').then(i => i.default as any),
    'pepicons': () => import('@iconify/json/json/pepicons.json').then(i => i.default as any),
    'bytesize': () => import('@iconify/json/json/bytesize.json').then(i => i.default as any),
    'ei': () => import('@iconify/json/json/ei.json').then(i => i.default as any),
    'fa6-solid': () => import('@iconify/json/json/fa6-solid.json').then(i => i.default as any),
    'fa6-regular': () => import('@iconify/json/json/fa6-regular.json').then(i => i.default as any),
    'octicon': () => import('@iconify/json/json/octicon.json').then(i => i.default as any),
    'ooui': () => import('@iconify/json/json/ooui.json').then(i => i.default as any),
    'nimbus': () => import('@iconify/json/json/nimbus.json').then(i => i.default as any),
    'openmoji': () => import('@iconify/json/json/openmoji.json').then(i => i.default as any),
    'twemoji': () => import('@iconify/json/json/twemoji.json').then(i => i.default as any),
    'noto': () => import('@iconify/json/json/noto.json').then(i => i.default as any),
    'noto-v1': () => import('@iconify/json/json/noto-v1.json').then(i => i.default as any),
    'emojione': () => import('@iconify/json/json/emojione.json').then(i => i.default as any),
    'emojione-monotone': () => import('@iconify/json/json/emojione-monotone.json').then(i => i.default as any),
    'emojione-v1': () => import('@iconify/json/json/emojione-v1.json').then(i => i.default as any),
    'fxemoji': () => import('@iconify/json/json/fxemoji.json').then(i => i.default as any),
    'bxl': () => import('@iconify/json/json/bxl.json').then(i => i.default as any),
    'logos': () => import('@iconify/json/json/logos.json').then(i => i.default as any),
    'simple-icons': () => import('@iconify/json/json/simple-icons.json').then(i => i.default as any),
    'cib': () => import('@iconify/json/json/cib.json').then(i => i.default as any),
    'fa6-brands': () => import('@iconify/json/json/fa6-brands.json').then(i => i.default as any),
    'arcticons': () => import('@iconify/json/json/arcticons.json').then(i => i.default as any),
    'file-icons': () => import('@iconify/json/json/file-icons.json').then(i => i.default as any),
    'brandico': () => import('@iconify/json/json/brandico.json').then(i => i.default as any),
    'entypo-social': () => import('@iconify/json/json/entypo-social.json').then(i => i.default as any),
    'cryptocurrency': () => import('@iconify/json/json/cryptocurrency.json').then(i => i.default as any),
    'flag': () => import('@iconify/json/json/flag.json').then(i => i.default as any),
    'circle-flags': () => import('@iconify/json/json/circle-flags.json').then(i => i.default as any),
    'flagpack': () => import('@iconify/json/json/flagpack.json').then(i => i.default as any),
    'cif': () => import('@iconify/json/json/cif.json').then(i => i.default as any),
    'gis': () => import('@iconify/json/json/gis.json').then(i => i.default as any),
    'map': () => import('@iconify/json/json/map.json').then(i => i.default as any),
    'geo': () => import('@iconify/json/json/geo.json').then(i => i.default as any),
    'fad': () => import('@iconify/json/json/fad.json').then(i => i.default as any),
    'academicons': () => import('@iconify/json/json/academicons.json').then(i => i.default as any),
    'wi': () => import('@iconify/json/json/wi.json').then(i => i.default as any),
    'healthicons': () => import('@iconify/json/json/healthicons.json').then(i => i.default as any),
    'medical-icon': () => import('@iconify/json/json/medical-icon.json').then(i => i.default as any),
    'la': () => import('@iconify/json/json/la.json').then(i => i.default as any),
    'eva': () => import('@iconify/json/json/eva.json').then(i => i.default as any),
    'dashicons': () => import('@iconify/json/json/dashicons.json').then(i => i.default as any),
    'flat-color-icons': () => import('@iconify/json/json/flat-color-icons.json').then(i => i.default as any),
    'entypo': () => import('@iconify/json/json/entypo.json').then(i => i.default as any),
    'foundation': () => import('@iconify/json/json/foundation.json').then(i => i.default as any),
    'raphael': () => import('@iconify/json/json/raphael.json').then(i => i.default as any),
    'icons8': () => import('@iconify/json/json/icons8.json').then(i => i.default as any),
    'iwwa': () => import('@iconify/json/json/iwwa.json').then(i => i.default as any),
    'fa-solid': () => import('@iconify/json/json/fa-solid.json').then(i => i.default as any),
    'fa-regular': () => import('@iconify/json/json/fa-regular.json').then(i => i.default as any),
    'fa-brands': () => import('@iconify/json/json/fa-brands.json').then(i => i.default as any),
    'fa': () => import('@iconify/json/json/fa.json').then(i => i.default as any),
    'fontisto': () => import('@iconify/json/json/fontisto.json').then(i => i.default as any),
    'icomoon-free': () => import('@iconify/json/json/icomoon-free.json').then(i => i.default as any),
    'ps': () => import('@iconify/json/json/ps.json').then(i => i.default as any),
    'subway': () => import('@iconify/json/json/subway.json').then(i => i.default as any),
    'oi': () => import('@iconify/json/json/oi.json').then(i => i.default as any),
    'wpf': () => import('@iconify/json/json/wpf.json').then(i => i.default as any),
    'simple-line-icons': () => import('@iconify/json/json/simple-line-icons.json').then(i => i.default as any),
    'et': () => import('@iconify/json/json/et.json').then(i => i.default as any),
    'el': () => import('@iconify/json/json/el.json').then(i => i.default as any),
    'vaadin': () => import('@iconify/json/json/vaadin.json').then(i => i.default as any),
    'grommet-icons': () => import('@iconify/json/json/grommet-icons.json').then(i => i.default as any),
    'whh': () => import('@iconify/json/json/whh.json').then(i => i.default as any),
    'si-glyph': () => import('@iconify/json/json/si-glyph.json').then(i => i.default as any),
    'zmdi': () => import('@iconify/json/json/zmdi.json').then(i => i.default as any),
    'ls': () => import('@iconify/json/json/ls.json').then(i => i.default as any),
    'bpmn': () => import('@iconify/json/json/bpmn.json').then(i => i.default as any),
    'flat-ui': () => import('@iconify/json/json/flat-ui.json').then(i => i.default as any),
    'vs': () => import('@iconify/json/json/vs.json').then(i => i.default as any),
    'topcoat': () => import('@iconify/json/json/topcoat.json').then(i => i.default as any),
    'il': () => import('@iconify/json/json/il.json').then(i => i.default as any),
    'websymbol': () => import('@iconify/json/json/websymbol.json').then(i => i.default as any),
    'fontelico': () => import('@iconify/json/json/fontelico.json').then(i => i.default as any),
    'feather': () => import('@iconify/json/json/feather.json').then(i => i.default as any),
    'mono-icons': () => import('@iconify/json/json/mono-icons.json').then(i => i.default as any),
  },
})

const uno = createGenerator({})

export const unocssPlugin = defineCSSProcessorPlugin(async({ css, html, js }) => {
  let output = css || ''
  const project = useProjectStore()
  const configFile = project.files['unocss.config.ts'] as UnoConfigFile

  if (configFile) {
    const config = configFile.compiled.config as UserConfig

    if (config) {
      uno.setConfig({
        ...config,
        presets: [
          iconsPreset,
          ...(config.presets ? config.presets : []),
        ],
      })

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
