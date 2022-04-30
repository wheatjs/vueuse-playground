export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useTitle } from '@vueuse/core'\n\nconst title = useTitle(null)\n",
    "templateContent": "\n  <note>Title</note>\n  <input v-model=\"title\" type=\"text\">\n",
    "path": "packages/core/useTitle/demo.vue"
  }
]
