export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { reactive } from 'vue'\nimport YAML from 'js-yaml'\nimport { useDevicePixelRatio } from '@vueuse/core'\n\nconst pixelRatio = reactive(useDevicePixelRatio())\nconst code = YAML.dump(pixelRatio)\n",
    "templateContent": "\n  <div>Device Pixel Ratio:</div>\n  <pre>{{ code }}</pre>\n",
    "path": "packages/core/useDevicePixelRatio/demo.vue"
  }
]
