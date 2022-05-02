export default [
  {
    "filename": "demo.vue",
    "script": "import { computed, ref } from 'vue'\nimport { useFavicon } from '@vueuse/core'\n\nconst type = ref('vueuse')\n\nconst favicon = computed(() =>\n  type.value === 'vue' ? 'vue.png' : 'favicon-32x32.png',\n)\n\nuseFavicon(favicon, {\n  baseUrl: '/',\n  rel: 'icon',\n})",
    "template": "<div>\n    Change favicon to\n  </div>\n  <button @click=\"type = 'vue'\">\n    Vue\n  </button>\n  <button @click=\"type = 'vueuse'\">\n    VueUse\n  </button>"
  }
]
