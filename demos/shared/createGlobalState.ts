export default [
  {
    "filename": "demo.vue",
    "script": "import { stringify } from './utils'\nimport { createGlobalState, useStorage } from '@vueuse/core'\n\nconst useState = createGlobalState(() =>\n  useStorage('vue-use-locale-storage', {\n    name: 'Banana',\n    color: 'Yellow',\n    size: 'Medium',\n  }),\n)\n\nconst state = useState()\nconst text = stringify(state)",
    "template": "<div>\n    <input v-model=\"state.name\" type=\"text\">\n    <input v-model=\"state.color\" type=\"text\">\n    <input v-model=\"state.size\" type=\"text\">\n\n    <pre lang=\"yaml\">{{ text }}</pre>\n  </div>"
  }
]
