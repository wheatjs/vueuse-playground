export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useInfiniteScroll } from '@vueuse/core'\n\nconst el = ref<HTMLElement | null>(null)\nconst data = ref([1, 2, 3, 4, 5, 6])\n\nuseInfiniteScroll(\n  el,\n  () => {\n    const length = data.value.length + 1\n    data.value.push(...Array.from({ length: 5 }, (_, i) => length + i))\n  },\n  { distance: 10 },\n)\n",
    "templateContent": "\n  <div ref=\"el\" class=\"flex flex-col gap-2 p-4 w-300px h-300px m-auto overflow-y-scroll bg-gray-500/5 rounded\">\n    <div v-for=\"item in data\" :key=\"item\" class=\"h-30 bg-gray-500/5 rounded p-3\">\n      {{ item }}\n    </div>\n  </div>\n",
    "path": "packages/core/useInfiniteScroll/demo.vue"
  }
]
