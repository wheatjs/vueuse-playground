export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useInterval } from '@vueuse/core'\n\nconst counter = useInterval(200)\n",
    "templateContent": "\n  <div>\n    <p>Interval fired: {{ counter }}</p>\n  </div>\n",
    "path": "packages/shared/useInterval/demo.vue"
  }
]
