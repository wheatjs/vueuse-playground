export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { reactive } from 'vue'\nimport { stringify } from '@vueuse/docs-utils'\nimport { useMouse } from '@vueuse/core'\n\nconst mouse = reactive(useMouse())\nconst text = stringify(mouse)\n",
    "templateContent": "\n  <pre lang=\"yaml\">{{ text }}</pre>\n",
    "path": "packages/core/useMouse/demo.vue"
  }
]
