export default [
  {
    "filename": "demo.vue",
    "script": "import { useWindowSize } from '@vueuse/core'\n\nconst { width, height } = useWindowSize()",
    "template": "<p>{{ width }} x {{ height }}</p>"
  }
]
