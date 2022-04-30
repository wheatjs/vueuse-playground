export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useToggle } from '@vueuse/core'\n\nconst [value, toggle] = useToggle()\n",
    "templateContent": "\n  <div>\n    <p>Value: {{ value ? 'ON' : 'OFF' }}</p>\n    <button @click=\"toggle()\">\n      Toggle\n    </button>\n    <button @click=\"value = true\">\n      Set ON\n    </button>\n    <button @click=\"value = false\">\n      Set OFF\n    </button>\n  </div>\n",
    "path": "packages/shared/useToggle/demo.vue"
  }
]
