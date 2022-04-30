export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { computed, ref } from 'vue'\nimport { useTextSelection } from '@vueuse/core'\n\nconst demo = ref()\nconst { rects, text } = useTextSelection()\nconst selectedStyle = computed(() => text.value ? 'text-primary' : 'text-gray-400')\n",
    "templateContent": "\n  <div ref=\"demo\">\n    <p class=\"font-600 text-blue-600\">\n      You can select any text on the page.\n    </p>\n    <p>\n      <strong class=\"w-140px inline-block\">Selected Text:</strong>\n      <em\n        :class=\"selectedStyle\"\n        class=\"whitespace-pre h-72 overflow-y-auto inline-block\"\n      >{{ text || 'No selected' }}</em>\n    </p>\n    <p>\n      <strong class=\"w-140px inline-block\">Selected rects:</strong>\n      {{ JSON.stringify(rects) }}\n    </p>\n  </div>\n",
    "path": "packages/core/useTextSelection/demo.vue"
  }
]
