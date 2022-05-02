export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { onStartTyping } from '@vueuse/core'\n\nconst input = ref<HTMLInputElement | null>(null)\n\nonStartTyping(() => {\n  if (!input.value?.active)\n    input.value!.focus()\n})",
    "template": "<note>Type anything</note>\n  <input ref=\"input\" type=\"text\" placeholder=\"Start typing to focus\">\n  <input type=\"text\" placeholder=\"Start typing has no effect here\">"
  }
]
