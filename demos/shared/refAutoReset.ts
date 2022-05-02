export default [
  {
    "filename": "demo.vue",
    "script": "import { refAutoReset } from '@vueuse/core'\n\nconst message = refAutoReset('Default message', 1000)\n\nconst setMessage = () => {\n  message.value = 'Changed'\n}",
    "template": "<div>\n    <button @click=\"setMessage()\">\n      Change Message\n    </button>\n    <p>\n      {{ message }}\n    </p>\n  </div>"
  }
]
