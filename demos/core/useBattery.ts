export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { reactive } from 'vue'\nimport { stringify } from '@vueuse/docs-utils'\nimport { useBattery } from '@vueuse/core'\n\nconst battery = reactive(useBattery())\nconst text = stringify(battery)\n",
    "templateContent": "\n  <pre lang=\"yaml\">{{ text }}</pre>\n",
    "path": "packages/core/useBattery/demo.vue"
  }
]
