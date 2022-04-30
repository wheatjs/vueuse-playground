export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useFocusWithin } from '@vueuse/core'\n\nconst target = ref()\n\nconst { focused } = useFocusWithin(target)\n",
    "templateContent": "\n  <div class=\"flex flex-col items-center\">\n    <form\n      ref=\"target\"\n      class=\"shadow bg-base border-main rounded max-w-96 mx-auto p-8\"\n    >\n      <input type=\"text\" placeholder=\"First Name\">\n      <input type=\"text\" placeholder=\"Last Name\">\n      <input type=\"text\" placeholder=\"Email\">\n      <input type=\"text\" placeholder=\"Password\">\n    </form>\n    <div mt2>\n      Focus in form: <BooleanDisplay :value=\"focused\" />\n    </div>\n  </div>\n",
    "path": "packages/core/useFocusWithin/demo.vue"
  }
]
