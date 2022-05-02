export default [
  {
    "filename": "demo.vue",
    "script": "import { reactive } from 'vue'\nimport { stringify } from './utils'\nimport { usePointer } from '@vueuse/core'\n\nconst pointer = reactive(usePointer())",
    "template": "<pre class=\"select-none\" style=\"touch-action: none\">{{ pointer }}</pre>"
  }
]
