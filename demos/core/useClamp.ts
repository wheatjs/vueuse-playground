export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useClamp } from '@vueuse/core'\nconst min = ref(0)\nconst max = ref(10)\n\nconst value = useClamp(0, min, max)",
    "template": "<div>\n    min:\n    <input v-model=\"min\" type=\"number\">\n    max:\n    <input v-model=\"max\" type=\"number\">\n    value:{{ value }}\n    <div>\n      <button @click=\"value--\">\n        Decrement\n      </button>\n      <button @click=\"value++\">\n        Increment\n      </button>\n    </div>\n  </div>"
  }
]
