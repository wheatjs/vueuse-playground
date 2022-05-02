export default [
  {
    "filename": "demo.vue",
    "script": "import { computed } from 'vue'\nimport { useActiveElement } from '@vueuse/core'\n\nconst activeElement = useActiveElement()\nconst key = computed(() => activeElement.value?.dataset?.id || 'null')",
    "template": "<note\n    class=\"mb-3\"\n  >\n    Select the inputs below to see the changes\n  </note>\n  <div\n    class=\"\n    grid\n    grid-cols-1\n    md:grid-cols-3\n    gap-2\"\n  >\n    <input\n      v-for=\"i in 6\"\n      :key=\"i\"\n      type=\"text\"\n      :data-id=\"i\"\n      class=\"!my-0 !min-w-0\"\n      :placeholder=\"`${i}`\"\n    >\n  </div>\n  <div class=\"mt-2\">\n    Current Active Element:\n    <span class=\"text-primary\">{{ key }}</span>\n  </div>"
  }
]
