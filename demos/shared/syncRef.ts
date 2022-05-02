export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { syncRef } from '@vueuse/core'\n\nconst a = ref('')\nconst b = ref('')\n\nsyncRef(a, b)",
    "template": "<input v-model=\"a\" placeholder=\"A\" type=\"text\">\n  <input v-model=\"b\" placeholder=\"B\" type=\"text\">"
  }
]
