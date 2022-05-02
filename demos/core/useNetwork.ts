export default [
  {
    "filename": "demo.vue",
    "script": "import { stringify } from './utils'\nimport { reactive } from 'vue'\nimport { useNetwork } from '@vueuse/core'\n\nconst network = reactive(useNetwork())\nconst text = stringify(network)",
    "template": "<pre lang=\"yaml\">{{ text }}</pre>"
  }
]
