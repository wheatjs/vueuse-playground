export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useFocusTrap } from '.'\n\nconst target = ref()\nconst { hasFocus, activate, deactivate } = useFocusTrap(target)",
    "template": "<div class=\"flex flex-col items-center\">\n    <button @click=\"activate()\">\n      {{ hasFocus ? 'Focus is trapped within form' : 'Trap focus within form' }}\n    </button>\n    <input\n      type=\"text\"\n      :placeholder=\"hasFocus ? 'You can\\'t focus me' : 'You can focus me'\"\n    >\n\n    <div\n      ref=\"target\"\n      class=\"shadow-lg bg-gray-600 bg-opacity-10 dark:(bg-gray-400 bg-opacity-10) rounded max-w-96 mx-auto p-8\"\n    >\n      <div class=\"flex flex-row items-center text-6xl text-center justify-center\">\n        <twemoji:face-with-monocle v-if=\"hasFocus\" />\n        <twemoji:sleeping-face v-else />\n      </div>\n      <input type=\"text\" class=\"!w-12\" placeholder=\"Email\">\n      <input type=\"text\" placeholder=\"Nickname\">\n      <input placeholder=\"Password\" type=\"text\">\n      <div class=\"flex flex-row justify-center\">\n        <button @click=\"deactivate()\">\n          Free Focus\n        </button>\n      </div>\n    </div>\n  </div>"
  }
]
