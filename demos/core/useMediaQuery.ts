export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { computed, reactive } from 'vue'\nimport YAML from 'js-yaml'\nimport { useMediaQuery } from '@vueuse/core'\n\nconst isLargeScreen = useMediaQuery('(min-width: 1024px)')\nconst prefersDark = useMediaQuery('(prefers-color-scheme: dark)')\n\nconst code = computed(() => YAML.dump(reactive({\n  isLargeScreen,\n  prefersDark,\n})))\n",
    "templateContent": "\n  <pre lang=\"json\">{{ code }}</pre>\n",
    "path": "packages/core/useMediaQuery/demo.vue"
  }
]
