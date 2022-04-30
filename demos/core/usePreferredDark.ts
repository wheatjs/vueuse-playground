export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { usePreferredDark } from '@vueuse/core'\n\nconst prefersDark = usePreferredDark()\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Prefers Dark:\n  </note>\n  <BooleanDisplay :value=\"prefersDark\" />\n",
    "path": "packages/core/usePreferredDark/demo.vue"
  }
]
