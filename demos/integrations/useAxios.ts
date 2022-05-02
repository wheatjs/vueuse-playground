export default [
  {
    "filename": "demo.vue",
    "script": "import { stringify } from './utils'\nimport { useAxios } from '.'\n\nconst { data, isLoading, isFinished, execute } = useAxios(\n  'https://jsonplaceholder.typicode.com/todos/1',\n)\nconst text = stringify(data)",
    "template": "<button @click=\"execute()\">\n    Execute\n  </button>\n  <note>Loading: {{ isLoading.toString() }}</note>\n  <note>Finished: {{ isFinished.toString() }}</note>\n  <pre lang=\"yaml\">{{ text }}</pre>"
  }
]
