export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport axios from 'axios'\nimport YAML from 'js-yaml'\nimport { useAsyncState } from '@vueuse/core'\n\nconst { isLoading, state, isReady, execute } = useAsyncState(\n  (args) => {\n    const id = args?.id || 1\n    return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(t => t.data)\n  },\n  {},\n  {\n    delay: 2000,\n    resetOnExecute: false,\n  },\n)\n",
    "templateContent": "\n  <div>\n    <note>Ready: {{ isReady.toString() }}</note>\n    <note>Loading: {{ isLoading.toString() }}</note>\n    <pre lang=\"json\" class=\"ml-2\">{{ YAML.dump(state) }}</pre>\n    <button @click=\"execute(2000, {id: 2})\">\n      Execute\n    </button>\n  </div>\n",
    "path": "packages/core/useAsyncState/demo.vue"
  }
]
