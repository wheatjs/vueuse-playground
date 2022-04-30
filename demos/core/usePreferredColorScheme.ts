export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { usePreferredColorScheme } from '@vueuse/core'\n\nconst colorScheme = usePreferredColorScheme()\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Preferred Color Scheme:\n  </note>\n  <code>{{ colorScheme }}</code>\n",
    "path": "packages/core/usePreferredColorScheme/demo.vue"
  }
]
