export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useColorMode } from '@vueuse/core'\nimport { useCycleList } from '../useCycleList'\n\nconst mode = useColorMode({\n  modes: {\n    contrast: 'dark contrast',\n    cafe: 'cafe',\n  },\n})\n\nconst { next } = useCycleList(['dark', 'light', 'cafe', 'contrast'], { initialValue: mode })\n",
    "templateContent": "\n  <button @click=\"next()\">\n    <carbon-moon v-if=\"mode === 'dark'\" class=\"align-middle\" />\n    <carbon-sun v-if=\"mode === 'light'\" class=\"align-middle\" />\n    <carbon-cafe v-if=\"mode === 'cafe'\" class=\"align-middle\" />\n    <carbon-contrast v-if=\"mode === 'contrast'\" class=\"align-middle\" />\n\n    <span class=\"ml-2 capitalize\">{{ mode }}</span>\n  </button>\n\n  <span class=\"p-4 opacity-50\">← Click to change the color mode</span>\n",
    "styleContent": "\nhtml.cafe {\n  filter: sepia(0.9) hue-rotate(315deg) brightness(0.9);\n}\n\nhtml.contrast {\n  filter: contrast(2);\n}\n",
    "path": "packages/core/useColorMode/demo.vue"
  }
]
