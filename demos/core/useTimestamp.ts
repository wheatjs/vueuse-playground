export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useTimestamp } from '@vueuse/core'\n\nconst timestamp = useTimestamp()\n",
    "templateContent": "\n  <div>Timestamp: {{ timestamp }}</div>\n",
    "path": "packages/core/useTimestamp/demo.vue"
  }
]
