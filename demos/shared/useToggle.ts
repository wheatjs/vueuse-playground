export default [
  {
    "filename": "demo.vue",
    "script": "import { useToggle } from '@vueuse/core'\n\nconst [value, toggle] = useToggle()",
    "template": "<div>\n    <p>Value: {{ value ? 'ON' : 'OFF' }}</p>\n    <button @click=\"toggle()\">\n      Toggle\n    </button>\n    <button @click=\"value = true\">\n      Set ON\n    </button>\n    <button @click=\"value = false\">\n      Set OFF\n    </button>\n  </div>"
  }
]
