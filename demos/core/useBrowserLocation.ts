export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { useBrowserLocation } from '@vueuse/core'\n\nconst location = useBrowserLocation()\nconst text = stringify(location)\n",
    "templateContent": "\n  <pre lang=\"yaml\">{{ text }}</pre>\n",
    "path": "packages/core/useBrowserLocation/demo.vue"
  }
]
