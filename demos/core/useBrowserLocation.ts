export default [
  {
    "filename": "demo.vue",
    "script": "import { stringify } from './utils'\nimport { useBrowserLocation } from '@vueuse/core'\n\nconst location = useBrowserLocation()\nconst text = stringify(location)",
    "template": "<pre lang=\"yaml\">{{ text }}</pre>"
  }
]
