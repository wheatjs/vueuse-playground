import { resolve } from 'node:path'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    Unocss({
      transformCSS: true,
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
      ],
    }),
  ],
})
