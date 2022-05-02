export default [
  {
    "filename": "demo.vue",
    "script": "import { usePreferredDark } from '@vueuse/core'\n\nconst prefersDark = usePreferredDark()",
    "template": "<note class=\"mb-2\">\n    Prefers Dark:\n  </note>\n  <BooleanDisplay :value=\"prefersDark\" />"
  }
]
