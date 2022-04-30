export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { createGlobalState } from '@vueuse/core'\nimport { useStorage } from '../../core/useStorage'\n\nconst useState = createGlobalState(() =>\n  useStorage('vue-use-locale-storage', {\n    name: 'Banana',\n    color: 'Yellow',\n    size: 'Medium',\n  }),\n)\n\nconst state = useState()\nconst text = stringify(state)\n",
    "templateContent": "\n  <div>\n    <input v-model=\"state.name\" type=\"text\">\n    <input v-model=\"state.color\" type=\"text\">\n    <input v-model=\"state.size\" type=\"text\">\n\n    <pre lang=\"yaml\">{{ text }}</pre>\n  </div>\n",
    "path": "packages/shared/createGlobalState/demo.vue"
  }
]
