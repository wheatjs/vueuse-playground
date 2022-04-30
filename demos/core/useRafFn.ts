export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useRafFn } from '@vueuse/core'\n\nconst count = ref(0)\nconst { pause, resume } = useRafFn(() => count.value += 1)\n",
    "templateContent": "\n  <div>Count: {{ count }}</div>\n  <button @click=\"pause\">\n    pause\n  </button>\n  <button @click=\"resume\">\n    resume\n  </button>\n",
    "path": "packages/core/useRafFn/demo.vue"
  }
]
