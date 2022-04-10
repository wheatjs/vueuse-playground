
/**
 * Source: https://github.com/vuejs/vue-next/blob/master/packages/sfc-playground/vite.config.ts
 *
 * Author: Evan You
 */

import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

function copyVuePlugin(): Plugin {
  return {
    name: 'copy-vue',
    generateBundle() {
      const filePath = path.resolve(
        __dirname,
        '../node_modules/vue/dist/vue.runtime.esm-browser.js',
      )
      if (!fs.existsSync(filePath)) {
        throw new Error(
          'vue.runtime.esm-browser.js not built. '
             + 'Run "yarn build vue -f esm-browser" first.',
        )
      }
      this.emitFile({
        type: 'asset',
        fileName: 'vue.runtime.esm-browser.js',
        source: fs.readFileSync(filePath, 'utf-8'),
      })
    },
  }
}

export default copyVuePlugin
