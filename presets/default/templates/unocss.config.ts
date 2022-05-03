import { defineConfig, presetAttributify, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  /**
   * Due to browser environment, icons are included by default.
   */
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
  ],
})
