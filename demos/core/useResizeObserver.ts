export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useResizeObserver } from '@vueuse/core'\n\nconst el = ref(null)\nconst text = ref('')\n\nuseResizeObserver(el, (entries) => {\n  const [entry] = entries\n  const { width, height } = entry.contentRect\n  text.value = `width: ${width}\\nheight: ${height}`\n})\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Resize the box to see changes\n  </note>\n  <textarea ref=\"el\" class=\"resizer\" disabled v-text=\"text\" />\n",
    "path": "packages/core/useResizeObserver/demo.vue"
  }
]
