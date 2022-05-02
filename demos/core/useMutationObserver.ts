export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useMutationObserver } from '@vueuse/core'\n\nconst el = ref(null)\nconst messages = ref<string[]>([])\nconst className = ref({})\nconst style = ref({})\n\nuseMutationObserver(\n  el,\n  (mutations) => {\n    const mutation = mutations[0]\n\n    if (!mutation)\n      return\n\n    messages.value.push(mutation.attributeName!)\n  },\n  { attributes: true },\n)\n\nsetTimeout(() => {\n  className.value = {\n    test: true,\n    test2: true,\n  }\n}, 1000)\n\nsetTimeout(() => {\n  style.value = {\n    color: 'red',\n  }\n}, 1550)",
    "template": "<div>\n    <div ref=\"el\" :class=\"className\" :style=\"style\">\n      <div v-for=\"(text, index) of messages\" :key=\"index\">\n        Mutation Attribute: {{ text }}\n      </div>\n    </div>\n  </div>"
  }
]
