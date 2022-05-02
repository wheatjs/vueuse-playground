export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useThrottleFn } from '@vueuse/core'\n\nconst updated = ref(0)\nconst clicked = ref(0)\nconst throttledFn = useThrottleFn(() => {\n  updated.value += 1\n}, 1000)\n\nconst clickedFn = () => {\n  clicked.value += 1\n  throttledFn()\n}",
    "template": "<div>\n    <button @click=\"clickedFn\">\n      Smash me!\n    </button>\n    <note>Delay is set to 1000ms for this demo.</note>\n\n    <p>Button clicked: {{ clicked }}</p>\n    <p>Event handler called: {{ updated }}</p>\n  </div>"
  }
]
