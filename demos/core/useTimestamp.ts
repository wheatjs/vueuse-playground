export default [
  {
    "filename": "demo.vue",
    "script": "import { useTimestamp } from '@vueuse/core'\n\nconst timestamp = useTimestamp()",
    "template": "<div>Timestamp: {{ timestamp }}</div>"
  }
]
