export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { usePageLeave } from '@vueuse/core'\n\nconst isLeft = usePageLeave()\n",
    "templateContent": "\n  <pre lang=\"json\">{{ { isLeft } }}</pre>\n",
    "path": "packages/core/usePageLeave/demo.vue"
  }
]
