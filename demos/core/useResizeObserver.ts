export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useResizeObserver } from '@vueuse/core'\n\nconst el = ref(null)\nconst text = ref('')\n\nuseResizeObserver(el, (entries) => {\n  const [entry] = entries\n  const { width, height } = entry.contentRect\n  text.value = `width: ${width}\\nheight: ${height}`\n})",
    "template": "<note class=\"mb-2\">\n    Resize the box to see changes\n  </note>\n  <textarea ref=\"el\" class=\"resizer\" disabled v-text=\"text\" />"
  }
]
