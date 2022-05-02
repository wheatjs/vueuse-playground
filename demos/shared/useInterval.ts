export default [
  {
    "filename": "demo.vue",
    "script": "import { useInterval } from '@vueuse/core'\n\nconst counter = useInterval(200)",
    "template": "<div>\n    <p>Interval fired: {{ counter }}</p>\n  </div>"
  }
]
