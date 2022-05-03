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
        presetIcons({
          collections: {
            custom: {
              pinia: '<svg viewBox="0 0 319 477"><linearGradient id="a"><stop offset="0" stop-color="#52ce63"/><stop offset="1" stop-color="#51a256"/></linearGradient><linearGradient id="b" x1="55.342075%" x2="42.816933%" xlink:href="#a" y1="0%" y2="42.862855%"/><linearGradient id="c" x1="55.348642%" x2="42.808103%" xlink:href="#a" y1="0%" y2="42.862855%"/><linearGradient id="d" x1="50%" x2="50%" y1="0%" y2="58.811243%"><stop offset="0" stop-color="#8ae99c"/><stop offset="1" stop-color="#52ce63"/></linearGradient><linearGradient id="e" x1="51.37763%" x2="44.584719%" y1="17.472551%" y2="100%"><stop offset="0" stop-color="#ffe56c"/><stop offset="1" stop-color="#ffc63a"/></linearGradient><g fill="none" fill-rule="evenodd" transform="translate(-34 -24)"><g transform="matrix(.99254615 .12186934 -.12186934 .99254615 33.922073 .976691)"><path d="m103.950535 258.274149c44.361599-4.360825 60.014503-40.391282 65.353094-94.699444s-30.93219-103.451001-46.020347-101.9678079c-15.088156 1.4831932-63.0385313 58.9051239-68.3771222 113.2132869-5.3385908 54.308162 4.6827754 87.814791 49.0443752 83.453965z" fill="url(#b)" transform="matrix(.70710678 -.70710678 .70710678 .70710678 -80.496332 125.892944)"/><path d="m275.876752 258.273992c44.3616 4.360826 53.167133-29.265322 47.828542-83.573485-5.338591-54.308162-52.073133-111.6105744-67.16129-113.0937675-15.088156-1.4831931-52.57477 47.5401275-47.236179 101.8482895s22.207328 90.458137 66.568927 94.818963z" fill="url(#c)" transform="matrix(.70710678 .70710678 -.70710678 .70710678 191.403399 -141.861963)"/><path d="m188.370027 216.876305c39.941834 0 50.95265-38.251987 50.95265-97.89874 0-59.6467532-37.367733-118.10125956-50.95265-118.10125956s-52.04735 58.45450636-52.04735 118.10125956c0 59.646753 12.105516 97.89874 52.04735 97.89874z" fill="url(#d)"/></g><path d="m184.473473 501c83.118854 0 150.526527-24.145148 150.526527-133.645148s-67.407673-199.354852-150.526527-199.354852c-83.118855 0-150.473473 89.854852-150.473473 199.354852s67.354618 133.645148 150.473473 133.645148z" fill="url(#e)"/><ellipse cx="260.5" cy="335" fill="#eaadcc" rx="21.5" ry="10"/><ellipse cx="102.5" cy="329" fill="#eaadcc" rx="21.5" ry="10" transform="matrix(.99254615 .12186934 -.12186934 .99254615 40.859033 -10.039292)"/><g transform="matrix(-.99939083 .0348995 .0348995 .99939083 269.284825 271.027667)"><path d="m73.1046985 58.2728794c6.7372416 4.9130333 14.3132632 6.6640587 22.7280649 5.2530761 8.4148016-1.4109825 14.5054466-5.2535769 18.2719346-11.527783" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" transform="matrix(.9998477 .01745241 -.01745241 .9998477 1.026464 -1.624794)"/><path d="m154.501124 3c-5.937545 0-11.312782 2.40629805-15.203644 6.29680621-3.89094 3.89058529-6.29748 9.26545449-6.29748 15.20263179 0 5.9376888 2.406488 11.3127422 6.297291 15.2034272 3.890886 3.8907673 9.266197 6.2971348 15.203833 6.2971348 5.937109 0 11.311896-2.4063889 15.202387-6.2972348 3.890299-3.8906535 6.296489-9.2656636 6.296489-15.2033272 0-5.9371521-2.406242-11.3119781-6.296677-15.20253181-3.890469-3.89058674-9.265181-6.29690619-15.202199-6.29690619z" fill="#000" /><path d="m154 21c0-3.865549 3.135362-7 6.999413-7 3.866399 0 7.000587 3.134451 7.000587 7s-3.134188 7-7.000587 7c-3.864051-.0011735-6.999413-3.134451-6.999413-7z" fill="#fff"/><path d="m24.5 13c-5.9375292 0-11.312426 2.406268-15.20299427 6.2967181-3.89069464 3.8905765-6.29700573 9.2654765-6.29700573 15.2027199 0 5.9377549 2.40625962 11.3128391 6.29681766 15.2035153 3.89059104 3.8907092 9.26556184 6.2970467 15.20318234 6.2970467 5.9371249 0 11.3122514-2.406419 15.2030371-6.2973229 3.8905441-3.8906623 6.2969629-9.2656416 6.2969629-15.2032391 0-5.937086-2.4064703-11.3118811-6.297151-15.2024437-3.890763-3.8906448-9.2658154-6.2969943-15.202849-6.2969943z" fill="#000" /><g fill="#fff"><path d="m136 24.499438c0 10.2185232 8.282911 18.500562 18.501124 18.500562 10.217089 0 18.498876-8.2820388 18.498876-18.500562 0-10.2173992-8.281787-18.499438-18.498876-18.499438-10.218213 0-18.501124 8.2820388-18.501124 18.499438zm-6 0c0-13.5311954 10.96929-24.499438 24.501124-24.499438 13.530838 0 24.498876 10.9683711 24.498876 24.499438 0 13.5319607-10.967808 24.500562-24.498876 24.500562-13.532064 0-24.501124-10.9684728-24.501124-24.500562z" fill-rule="nonzero" stroke="#fff" stroke-width="3"/><path d="m6 34.499438c0 10.2185232 8.2817873 18.500562 18.5 18.500562 10.2170889 0 18.5-8.2820388 18.5-18.500562 0-10.2173992-8.2829111-18.499438-18.5-18.499438-10.2182127 0-18.5 8.2820388-18.5 18.499438zm-6 0c0-13.531297 10.9682681-24.499438 24.5-24.499438 13.5309398 0 24.5 10.9684728 24.5 24.499438 0 13.5318591-10.96883 24.500562-24.5 24.500562-13.531962 0-24.5-10.9683711-24.5-24.500562z" fill-rule="nonzero" stroke="#fff" stroke-width="3"/><path d="m24 31c0-3.865549 3.134451-7 7-7s7 3.134451 7 7-3.134451 7-7 7-7-3.134451-7-7z"/></g></g><g stroke-linecap="round" stroke-width="11"><g stroke="#ecb732"><path d="m70.5 377.5 74 77"/><path d="m134.5 386.5-47 50"/></g><g stroke="#ecb732" transform="matrix(-1 0 0 1 298 377)"><path d="m.5.5 74 77"/><path d="m64.5 9.5-47 50"/></g><g stroke="#ffc73b" transform="matrix(0 1 -1 0 215 207)"><path d="m.5.5 49 49"/><path d="m.5 10.5 49 49" transform="matrix(-1 0 0 1 50 0)"/></g></g></g></svg>',
              stackblitz: '<svg viewBox="0 0 28 28"><path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z"></path></svg>',
            },
          },
        }),
        presetTypography(),
        presetWebFonts({
          fonts: {
            sans: 'Inter',
            mono: 'JetBrains Mono',
          },
        }),
      ],
      safelist: [
        'i-vscode-icons-default-file',
        'i-vscode-icons-file-type-vue',
        'i-carbon-color-palette',
        'i-carbon-application',
        'i-vscode-icons-file-type-typescript',
        'i-vscode-icons-file-type-js',
        'i-vscode-icons-file-type-json',
        'i-vscode-icons-file-type-css',
        'i-mdi-content-save',
        'i-logos-unocss',
        'i-custom-stackblitz',
        'i-custom-stackblitz?mask',
        'i-custom-pinia',
        'i-logos-vue',
        'i-logos-vueuse',
        'dark:filter-invert',
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
