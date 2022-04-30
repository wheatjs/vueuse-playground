export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useElementHover } from '@vueuse/core'\n\nconst el = ref()\nconst isHovered = useElementHover(el)\n",
    "templateContent": "\n  <button ref=\"el\">\n    <span>{{ isHovered ? 'Thank you!' : 'Hover me' }}</span>\n  </button>\n",
    "path": "packages/core/useElementHover/demo.vue"
  }
]
