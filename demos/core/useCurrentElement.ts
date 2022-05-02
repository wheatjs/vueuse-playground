export default [
  {
    "filename": "demo.vue",
    "script": "import { useCurrentElement } from '@vueuse/core'\nimport { watchEffect } from 'vue'\n\nconst el = useCurrentElement()\n\nwatchEffect(() => {\n  console.log('Current element:', el.value)\n})",
    "template": "<div>Open your console.log to see the element</div>"
  }
]
