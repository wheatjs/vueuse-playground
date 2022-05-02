export default [
  {
    "filename": "demo.vue",
    "script": "import { useToggle } from '@vueuse/shared'\nimport { isDark } from './dark'\n\n// const isDark = useDark()\nconst toggleDark = useToggle(isDark)",
    "template": "<button @click=\"toggleDark()\">\n    <i inline-block align-middle i=\"dark:carbon-moon carbon-sun\" />\n\n    <span class=\"ml-2\">{{ isDark ? 'Dark': 'Light' }}</span>\n  </button>"
  },
  {
    "filename": "dark.ts",
    "script": "import { useDark } from '@vueuse/core'\n\nexport const isDark = useDark({\n  storageKey: 'vue-theme-appearance',\n})"
  }
]
