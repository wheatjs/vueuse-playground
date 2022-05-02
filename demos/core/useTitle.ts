export default [
  {
    "filename": "demo.vue",
    "script": "import { useTitle } from '@vueuse/core'\n\nconst title = useTitle(null)",
    "template": "<note>Title</note>\n  <input v-model=\"title\" type=\"text\">"
  }
]
