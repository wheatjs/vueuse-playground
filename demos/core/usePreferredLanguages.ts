export default [
  {
    "filename": "demo.vue",
    "script": "import { usePreferredLanguages } from '@vueuse/core'\n\nconst languages = usePreferredLanguages()",
    "template": "<note class=\"mb-2\">\n    Preferred Languages:\n  </note>\n  <div>\n    <code v-for=\"lang in languages\" :key=\"lang\" class=\"mr-2\">{{ lang }}</code>\n  </div>"
  }
]
