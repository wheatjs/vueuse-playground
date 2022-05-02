export default [
  {
    "filename": "demo.vue",
    "script": "import { reactive } from 'vue'\nimport { stringify } from './utils'\nimport { useMouse } from '@vueuse/core'\n\nconst mouse = reactive(useMouse())\nconst text = stringify(mouse)",
    "template": "<pre lang=\"yaml\">{{ text }}</pre>"
  }
]
