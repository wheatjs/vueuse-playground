export default [
  {
    "filename": "demo.vue",
    "script": "import { useFps } from '@vueuse/core'\n\nconst fps = useFps()",
    "template": "FPS: {{ fps }}"
  }
]
