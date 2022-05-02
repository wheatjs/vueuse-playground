export default [
  {
    "filename": "demo.vue",
    "script": "import { computed, reactive } from 'vue'\nimport YAML from 'js-yaml'\nimport { useMediaQuery } from '@vueuse/core'\n\nconst isLargeScreen = useMediaQuery('(min-width: 1024px)')\nconst prefersDark = useMediaQuery('(prefers-color-scheme: dark)')\n\nconst code = computed(() => YAML.dump(reactive({\n  isLargeScreen,\n  prefersDark,\n})))",
    "template": "<pre lang=\"json\">{{ code }}</pre>"
  }
]
