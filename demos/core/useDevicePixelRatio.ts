export default [
  {
    "filename": "demo.vue",
    "script": "import { reactive } from 'vue'\nimport { stringify } from './utils'\nimport { useDevicePixelRatio } from '@vueuse/core'\n\nconst pixelRatio = reactive(useDevicePixelRatio())\nconst code = stringify(pixelRatio)",
    "template": "<div>Device Pixel Ratio:</div>\n  <pre>{{ code }}</pre>"
  }
]
