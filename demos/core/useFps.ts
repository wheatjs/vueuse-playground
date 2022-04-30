export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useFps } from '@vueuse/core'\n\nconst fps = useFps()\n",
    "templateContent": "\n  FPS: {{ fps }}\n",
    "path": "packages/core/useFps/demo.vue"
  }
]
