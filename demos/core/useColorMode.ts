export default [
  {
    "filename": "demo.vue",
    "script": "import { useColorMode, useCycleList } from '@vueuse/core'\n\nconst mode = useColorMode({\n  modes: {\n    contrast: 'dark contrast',\n    cafe: 'cafe',\n  },\n})\n\nconst { next } = useCycleList(['dark', 'light', 'cafe', 'contrast'], { initialValue: mode })",
    "template": "<button @click=\"next()\">\n    <i v-if=\"mode === 'dark'\" i-carbon-moon inline-block align-middle class=\"align-middle\" />\n    <i v-if=\"mode === 'light'\" i-carbon-sun inline-block align-middle class=\"align-middle\" />\n    <i v-if=\"mode === 'cafe'\" i-carbon-cafe inline-block align-middle class=\"align-middle\" />\n    <i v-if=\"mode === 'contrast'\" i-carbon-contrast inline-block align-middle class=\"align-middle\" />\n\n    <span class=\"ml-2 capitalize\">{{ mode }}</span>\n  </button>\n\n  <span class=\"p-4 opacity-50\">← Click to change the color mode</span>",
    "style": "html.cafe {\n  filter: sepia(0.9) hue-rotate(315deg) brightness(0.9);\n}\n\nhtml.contrast {\n  filter: contrast(2);\n}"
  }
]
