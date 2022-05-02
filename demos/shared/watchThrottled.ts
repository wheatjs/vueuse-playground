export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { watchThrottled } from '@vueuse/core'\n\nconst input = ref('')\nconst updated = ref(0)\n\nwatchThrottled(input, () => {\n  updated.value += 1\n}, { throttle: 1000 })",
    "template": "<div>\n    <input v-model=\"input\" placeholder=\"Try to type anything...\" type=\"text\">\n    <note>Delay is set to 1000ms for this demo.</note>\n\n    <p>Input: {{ input }}</p>\n    <p>Times Updated: {{ updated }}</p>\n  </div>"
  }
]
