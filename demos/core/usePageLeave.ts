export default [
  {
    "filename": "demo.vue",
    "script": "import { usePageLeave } from '@vueuse/core'\n\nconst isLeft = usePageLeave()",
    "template": "<pre lang=\"json\">{{ { isLeft } }}</pre>"
  }
]
