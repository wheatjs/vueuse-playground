export default [
  {
    "filename": "demo.vue",
    "script": "import { useNow } from '@vueuse/core'\n\nconst now = useNow()",
    "template": "<div>Now: {{ now }}</div>"
  }
]
