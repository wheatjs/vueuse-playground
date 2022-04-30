export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport './style.css'\nimport { useNProgress } from '.'\n\nconst { isLoading, progress } = useNProgress()\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Click to change progress status\n  </note>\n  <button @click=\"isLoading = !isLoading\">\n    {{ !isLoading ? 'Start' : 'Stop' }}\n  </button>\n  <b v-if=\"isLoading\" class=\"ml-2\">{{ ((progress || 0) * 100).toFixed(0) }}%</b>\n",
    "path": "packages/integrations/useNProgress/demo.vue"
  },
  {
    "name": "style.css",
    "path": "packages/integrations/useNProgress/style.css"
  }
]
