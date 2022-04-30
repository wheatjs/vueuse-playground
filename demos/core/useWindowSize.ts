export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useWindowSize } from '@vueuse/core'\n\nconst { width, height } = useWindowSize()\n",
    "templateContent": "\n  <p>{{ width }} x {{ height }}</p>\n",
    "path": "packages/core/useWindowSize/demo.vue"
  }
]
