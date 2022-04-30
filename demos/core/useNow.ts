export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useNow } from '@vueuse/core'\n\nconst now = useNow()\n",
    "templateContent": "\n  <div>Now: {{ now }}</div>\n",
    "path": "packages/core/useNow/demo.vue"
  }
]
