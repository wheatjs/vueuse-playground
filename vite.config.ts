import { resolve } from 'node:path'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Pages from 'vite-plugin-pages'

import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'
import CopyVue from './plugins/copy-vue'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      '@playground/config': `${resolve(__dirname)}/vueuse-playground.config.ts`,
      '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js': '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js',
      '@vue/compiler-sfc': '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js',
    },
  },
  plugins: [
    Vue(),
    CopyVue(),

    /**
     * https://github.com/unocss/unocss
     */
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
        presetWebFonts({
          fonts: {
            sans: 'Inter',
            mono: 'JetBrains Mono',
          },
        }),
      ],
    }),

    /**
     * https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
     */
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/**')],
    }),

    /**
     * https://github.com/hannoeru/vite-plugin-pages
     */
    Pages(),

    /**
     * https://github.com/antfu/unplugin-vue-components
     */
    Components({
      dts: 'src/components.d.ts',
      dirs: [
        'src/components',
        'src/modules',
      ],
    }),

    /**
     * https://github.com/antfu/unplugin-auto-import
     */
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        'pinia',
        '@vueuse/core',
      ],
    }),
  ],
  optimizeDeps: {
    exclude: [
      '@iconify/utils/lib/loader/fs',
      '@iconify/utils/lib/loader/install-pkg',
      '@iconify/utils/lib/loader/node-loader',
      '@iconify/utils/lib/loader/node-loaders',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '@iconify/utils/lib/loader/fs',
        '@iconify/utils/lib/loader/install-pkg',
        '@iconify/utils/lib/loader/node-loader',
        '@iconify/utils/lib/loader/node-loaders',
      ],
      output: {
        manualChunks: {
          monaco: ['monaco-editor', 'emmet-monaco-es'],
        },
      },
    },
  },
})
