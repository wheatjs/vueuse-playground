export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { syncRef } from '@vueuse/core'\n\nconst a = ref('')\nconst b = ref('')\n\nsyncRef(a, b)\n",
    "templateContent": "\n  <input v-model=\"a\" placeholder=\"A\" type=\"text\">\n  <input v-model=\"b\" placeholder=\"B\" type=\"text\">\n",
    "path": "packages/shared/syncRef/demo.vue"
  }
]
