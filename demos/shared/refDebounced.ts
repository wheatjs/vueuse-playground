export default [
  {
    "filename": "demo.vue",
    "script": "import { ref, watch } from 'vue'\nimport { refDebounced } from '@vueuse/core'\n\nconst input = ref('')\nconst debounced = refDebounced(input, 1000)\nconst updated = ref(0)\n\nwatch(debounced, () => (updated.value += 1))",
    "template": "<div>\n    <input v-model=\"input\" placeholder=\"Try to type anything...\" type=\"text\">\n    <note>Delay is set to 1000ms for this demo.</note>\n\n    <p>Debounced: {{ debounced }}</p>\n    <p>Times Updated: {{ updated }}</p>\n  </div>"
  }
]
