export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useTimeoutFn } from '@vueuse/core'\n\nconst defaultText = 'Please wait for 3 seconds'\nconst text = ref(defaultText)\nconst { start, isPending } = useTimeoutFn(() => {\n  text.value = 'Fired!'\n}, 3000)\n\nconst restart = () => {\n  text.value = defaultText\n  start()\n}",
    "template": "<p>{{ text }}</p>\n  <button :class=\"{ disabled: isPending }\" @click=\"restart()\">\n    Restart\n  </button>"
  }
]
