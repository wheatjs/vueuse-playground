export default [
  {
    "filename": "demo.vue",
    "script": "import { useTimeout } from '@vueuse/core'\n\nconst { ready, start } = useTimeout(1000, { controls: true })",
    "template": "<div>\n    <p>Ready: {{ ready.toString() }}</p>\n    <button :disabled=\"!ready\" @click=\"start()\">\n      Start Again\n    </button>\n  </div>"
  }
]
