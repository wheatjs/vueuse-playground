export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useElementHover } from '@vueuse/core'\n\nconst el = ref()\nconst isHovered = useElementHover(el)",
    "template": "<button ref=\"el\">\n    <span>{{ isHovered ? 'Thank you!' : 'Hover me' }}</span>\n  </button>"
  }
]
