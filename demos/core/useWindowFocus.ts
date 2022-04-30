export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref, watch } from 'vue'\nimport { useWindowFocus } from '@vueuse/core'\n\nconst startMessage = '💡 Click somewhere outside of the document to unfocus.'\nconst message = ref(startMessage)\nconst focused = useWindowFocus()\n\nwatch(focused, (isFocused) => {\n  if (isFocused)\n    message.value = startMessage\n  else\n    message.value = 'ℹ Tab is unfocused'\n})\n",
    "templateContent": "\n  <div>{{ message }}</div>\n",
    "path": "packages/core/useWindowFocus/demo.vue"
  }
]
