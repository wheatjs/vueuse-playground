export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { reactive } from 'vue'\nimport { useNetwork } from '@vueuse/core'\n\nconst network = reactive(useNetwork())\nconst text = stringify(network)\n",
    "templateContent": "\n  <pre lang=\"yaml\">{{ text }}</pre>\n",
    "path": "packages/core/useNetwork/demo.vue"
  }
]
