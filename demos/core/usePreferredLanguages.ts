export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { usePreferredLanguages } from '@vueuse/core'\n\nconst languages = usePreferredLanguages()\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Preferred Languages:\n  </note>\n  <div>\n    <code v-for=\"lang in languages\" :key=\"lang\" class=\"mr-2\">{{ lang }}</code>\n  </div>\n",
    "path": "packages/core/usePreferredLanguages/demo.vue"
  }
]
