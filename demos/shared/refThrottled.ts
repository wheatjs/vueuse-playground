export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref, watch } from 'vue'\nimport { refThrottled } from '@vueuse/core'\n\nconst trailing = ref(true)\nconst leading = ref(false)\nconst input = ref('')\nconst throttled = refThrottled(input, 1000, trailing.value, leading.value)\nconst updated = ref(0)\n\nwatch(throttled, () => {\n  updated.value += 1\n})\n",
    "templateContent": "\n  <div>\n    <input v-model=\"input\" placeholder=\"Try to type anything...\" type=\"text\">\n    <note>Delay is set to 1000ms for this demo.</note>\n\n    <p>Throttled: {{ throttled }}</p>\n    <p>Times Updated: {{ updated }}</p>\n    <p>Trailing: {{ trailing }}</p>\n    <p>Leading: {{ leading }}</p>\n  </div>\n",
    "path": "packages/shared/refThrottled/demo.vue"
  }
]
