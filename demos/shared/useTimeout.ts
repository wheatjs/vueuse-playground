export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useTimeout } from '@vueuse/core'\n\nconst { ready, start } = useTimeout(1000, { controls: true })\n",
    "templateContent": "\n  <div>\n    <p>Ready: {{ ready.toString() }}</p>\n    <button :disabled=\"!ready\" @click=\"start()\">\n      Start Again\n    </button>\n  </div>\n",
    "path": "packages/shared/useTimeout/demo.vue"
  }
]
