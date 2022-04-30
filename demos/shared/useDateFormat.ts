export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useDateFormat, useNow } from '@vueuse/core'\n\nconst formatter = ref('YYYY-MM-DD HH:mm:ss')\nconst formatted = useDateFormat(useNow(), formatter)\n\n",
    "templateContent": "\n  <p class=\"text-20px font-bold text-emerald-500\">\n    {{ formatted }}\n  </p>\n  <div class=\"flex items-center\">\n    <span class=\"mr-5px text-18px\">\n      Formatter Editor :\n    </span>\n    <input v-model=\"formatter\" type=\"text\">\n  </div>\n",
    "path": "packages/shared/useDateFormat/demo.vue"
  }
]
