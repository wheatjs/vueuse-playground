export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { reactive } from 'vue'\nimport { stringify } from '@vueuse/docs-utils'\nimport { usePointer } from '@vueuse/core'\n\nconst pointer = reactive(usePointer())\n",
    "templateContent": "\n  <pre class=\"select-none\" style=\"touch-action: none\">{{ pointer }}</pre>\n",
    "path": "packages/core/usePointer/demo.vue"
  }
]
