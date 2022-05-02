export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { watchIgnorable } from '@vueuse/core'\n\nconst log = ref('')\nconst source = ref(0)\n\nconst { ignoreUpdates } = watchIgnorable(\n  source,\n  v => (log.value += `Changed to \"${v}\"\\n`),\n  { flush: 'sync' },\n)\n\nconst clear = () => {\n  source.value = 0\n  log.value = ''\n}\nconst update = () => {\n  source.value++\n}\nconst ignoredUpdate = () => {\n  ignoreUpdates(() => {\n    source.value++\n  })\n}",
    "template": "<div>Value: {{ source }}</div>\n  <button @click=\"update\">\n    Update\n  </button>\n  <button class=\"orange\" @click=\"ignoredUpdate\">\n    Ignored Update\n  </button>\n  <button @click=\"clear\">\n    Reset\n  </button>\n\n  <br>\n\n  <note>Log</note>\n\n  <pre>{{ log }}</pre>"
  }
]
