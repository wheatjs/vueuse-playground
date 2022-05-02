export default [
  {
    "filename": "demo.vue",
    "script": "import { stringify } from './utils'\nimport { reactive } from 'vue'\nimport { useDeviceOrientation } from '@vueuse/core'\n\nconst orientation = reactive(useDeviceOrientation())\nconst text = stringify(orientation)",
    "template": "<pre lang=\"yaml\">{{ text }}</pre>"
  }
]
