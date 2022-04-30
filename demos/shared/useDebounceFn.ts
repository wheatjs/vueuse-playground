export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useDebounceFn } from '@vueuse/core'\n\nconst updated = ref(0)\nconst clicked = ref(0)\nconst debouncedFn = useDebounceFn(() => {\n  updated.value += 1\n}, 1000, { maxWait: 5000 })\n\nconst clickedFn = () => {\n  clicked.value += 1\n  debouncedFn()\n}\n",
    "templateContent": "\n  <button @click=\"clickedFn\">\n    Smash me!\n  </button>\n  <note>Delay is set to 1000ms and maxWait is set to 5000ms for this demo.</note>\n\n  <p>Button clicked: {{ clicked }}</p>\n  <p>Event handler called: {{ updated }}</p>\n",
    "path": "packages/shared/useDebounceFn/demo.vue"
  }
]
