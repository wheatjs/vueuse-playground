export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { useAxios } from '.'\n\nconst { data, isLoading, isFinished, execute } = useAxios(\n  'https://jsonplaceholder.typicode.com/todos/1',\n)\nconst text = stringify(data)\n",
    "templateContent": "\n  <button @click=\"execute()\">\n    Execute\n  </button>\n  <note>Loading: {{ isLoading.toString() }}</note>\n  <note>Finished: {{ isFinished.toString() }}</note>\n  <pre lang=\"yaml\">{{ text }}</pre>\n",
    "path": "packages/integrations/useAxios/demo.vue"
  }
]
