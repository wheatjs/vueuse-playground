export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useRafFn } from '@vueuse/core'\n\nconst count = ref(0)\nconst { pause, resume } = useRafFn(() => count.value += 1)",
    "template": "<div>Count: {{ count }}</div>\n  <button @click=\"pause\">\n    pause\n  </button>\n  <button @click=\"resume\">\n    resume\n  </button>"
  }
]
