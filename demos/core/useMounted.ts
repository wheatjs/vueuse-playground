export default [
  {
    "filename": "demo.vue",
    "script": "import { useMounted } from '@vueuse/core'\n\nconst isMounted = useMounted()",
    "template": "<div>{{ isMounted ? 'mounted' : 'unmounted' }}</div>"
  }
]
