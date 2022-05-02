export default [
  {
    "filename": "demo.vue",
    "script": "import { usePreferredColorScheme } from '@vueuse/core'\n\nconst colorScheme = usePreferredColorScheme()",
    "template": "<note class=\"mb-2\">\n    Preferred Color Scheme:\n  </note>\n  <code>{{ colorScheme }}</code>"
  }
]
