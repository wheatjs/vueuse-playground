export default [
  {
    "filename": "demo.vue",
    "script": "import { reactive } from 'vue'\nimport { stringify } from './utils'\nimport { useBattery } from '@vueuse/core'\n\nconst battery = reactive(useBattery())\nconst text = stringify(battery)",
    "template": "<pre lang=\"yaml\">{{ text }}</pre>"
  }
]
