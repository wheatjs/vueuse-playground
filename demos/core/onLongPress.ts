export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { onLongPress } from '@vueuse/core'\n\nconst htmlRef = ref<HTMLElement | null>(null)\nconst htmlRefOptions = ref<HTMLElement | null>(null)\n\nconst longPressed = ref(false)\n\nconst onLongPressCallback = (e: PointerEvent) => {\n  longPressed.value = true\n}\n\nconst reset = () => {\n  longPressed.value = false\n}\n\nonLongPress(htmlRef, onLongPressCallback)\nonLongPress(htmlRefOptions, onLongPressCallback, { delay: 1000 })",
    "template": "<p>Long Pressed: <BooleanDisplay :value=\"longPressed\" /></p>\n  <button ref=\"htmlRef\" class=\"ml-2 button small\">\n    Press long (500ms)\n  </button>\n  <button ref=\"htmlRefOptions\" class=\"ml-2 button small\">\n    Press long (1000ms)\n  </button>\n  <button class=\"ml-2 button small\" @click=\"reset\">\n    Reset\n  </button>"
  }
]
