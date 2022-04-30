export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useToggle } from '@vueuse/shared'\nimport { isDark } from '../../.vitepress/theme/composables/dark'\n\n// const isDark = useDark()\nconst toggleDark = useToggle(isDark)\n",
    "templateContent": "\n  <button @click=\"toggleDark()\">\n    <carbon-moon v-if=\"isDark\" class=\"align-middle\" />\n    <carbon-sun v-else class=\"align-middle\" />\n\n    <span class=\"ml-2\">{{ isDark ? 'Dark': 'Light' }}</span>\n  </button>\n",
    "path": "packages/core/useDark/demo.vue"
  }
]
