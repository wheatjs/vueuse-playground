export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { reactive } from 'vue'\nimport { useDeviceOrientation } from '@vueuse/core'\n\nconst orientation = reactive(useDeviceOrientation())\nconst text = stringify(orientation)\n",
    "templateContent": "\n  <pre lang=\"yaml\">{{ text }}</pre>\n",
    "path": "packages/core/useDeviceOrientation/demo.vue"
  }
]
