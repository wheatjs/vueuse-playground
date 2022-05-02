export default [
  {
    "filename": "demo.vue",
    "script": "import axios from 'axios-esm'\nimport YAML from 'js-yaml'\nimport { useAsyncState } from '@vueuse/core'\n\nconst { isLoading, state, isReady, execute } = useAsyncState(\n  (args) => {\n    const id = args?.id || 1\n    return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(t => t.data)\n  },\n  {},\n  {\n    delay: 2000,\n    resetOnExecute: false,\n  },\n)",
    "template": "<div>\n    <note>Ready: {{ isReady.toString() }}</note>\n    <note>Loading: {{ isLoading.toString() }}</note>\n    <pre lang=\"json\" class=\"ml-2\">{{ YAML.dump(state) }}</pre>\n    <button @click=\"execute(2000, {id: 2})\">\n      Execute\n    </button>\n  </div>"
  }
]
