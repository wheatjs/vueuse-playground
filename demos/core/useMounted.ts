export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useMounted } from '@vueuse/core'\n\nconst isMounted = useMounted()\n",
    "templateContent": "\n  <div>{{ isMounted ? 'mounted' : 'unmounted' }}</div>\n",
    "path": "packages/core/useMounted/demo.vue"
  }
]
