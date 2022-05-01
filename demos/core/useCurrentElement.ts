export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useCurrentElement } from '@vueuse/core'\nimport { watchEffect } from 'vue'\n\nconst el = useCurrentElement()\n\nwatchEffect(() => {\n  console.log('Current element:', el.value)\n})\n",
    "templateContent": "\n  <div>Open your console.log to see the element</div>\n",
    "path": "packages/core/useCurrentElement/demo.vue"
  }
]
