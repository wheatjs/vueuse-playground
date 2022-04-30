export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { refAutoReset } from '@vueuse/core'\n\nconst message = refAutoReset('Default message', 1000)\n\nconst setMessage = () => {\n  message.value = 'Changed'\n}\n",
    "templateContent": "\n  <div>\n    <button @click=\"setMessage()\">\n      Change Message\n    </button>\n    <p>\n      {{ message }}\n    </p>\n  </div>\n",
    "path": "packages/shared/refAutoReset/demo.vue"
  }
]
