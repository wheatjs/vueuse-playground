export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { useStorage } from '@vueuse/core'\n\nconst state = useStorage('vue-use-local-storage', {\n  name: 'Banana',\n  color: 'Yellow',\n  size: 'Medium',\n  count: 0,\n})\n\nconst text = stringify(state)\n",
    "templateContent": "\n  <div>\n    <input v-model=\"state.name\" type=\"text\">\n    <input v-model=\"state.color\" type=\"text\">\n    <input v-model=\"state.size\" type=\"text\">\n    <input v-model.number=\"state.count\" type=\"range\" min=\"0\" step=\"0.01\" max=\"1000\">\n\n    <pre lang=\"json\">{{ text }}</pre>\n  </div>\n",
    "path": "packages/core/useStorage/demo.vue"
  }
]
