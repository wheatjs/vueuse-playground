export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref, watch } from 'vue'\nimport { useTimeoutFn } from '@vueuse/shared'\nimport { useDocumentVisibility } from '@vueuse/core'\n\nconst startMessage = '💡 Minimize the page or switch tab then return'\nconst message = ref(startMessage)\nconst visibility = useDocumentVisibility()\n\nconst timeout = useTimeoutFn(() => {\n  message.value = startMessage\n}, 3000)\n\nwatch(visibility, (current, previous) => {\n  if (current === 'visible' && previous === 'hidden') {\n    message.value = '🎉 Welcome back!'\n    timeout.start()\n  }\n})\n",
    "templateContent": "\n  <div>{{ message }}</div>\n",
    "path": "packages/core/useDocumentVisibility/demo.vue"
  }
]
