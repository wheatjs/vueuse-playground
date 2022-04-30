export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { nextTick, ref, watch } from 'vue'\nimport { useTemplateRefsList } from '@vueuse/core'\n\nconst count = ref(5)\nconst refs = useTemplateRefsList<HTMLDivElement>()\n\nwatch(refs, async() => {\n  await nextTick()\n  console.log([...refs.value])\n}, {\n  deep: true,\n  flush: 'post',\n})\n",
    "templateContent": "\n  <span v-for=\"i of count\" :key=\"i\" :ref=\"refs.set\" class=\"mr-2\">\n    {{ i }}\n  </span>\n  <br>\n  <button @click=\"count += 1\">\n    Inc\n  </button>\n  <button :disabled=\"count <= 0\" @click=\"count -= 1\">\n    Dec\n  </button>\n  <note>Open the console to see the output</note>\n",
    "path": "packages/core/useTemplateRefsList/demo.vue"
  }
]
