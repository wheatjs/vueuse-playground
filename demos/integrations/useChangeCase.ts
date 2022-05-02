export default [
  {
    "filename": "demo.vue",
    "script": "import { computed, ref, shallowReadonly } from 'vue-demi'\nimport { useChangeCase } from '.'\nimport type { ChangeCaseType } from '.'\nconst arr: Array<ChangeCaseType> = [\n  'camelCase',\n  'capitalCase',\n  'constantCase',\n  'dotCase',\n  'headerCase',\n  'noCase',\n  'paramCase',\n  'pascalCase',\n  'pathCase',\n  'sentenceCase',\n  'snakeCase',\n]\nconst types = shallowReadonly(arr)\nconst input = ref('helloWorld')\nconst type = ref<ChangeCaseType>(arr[0])\nconst changeCase = computed(() => {\n  return useChangeCase(input, type.value)\n})",
    "template": "<div>\n    <label v-for=\"item in types\" :key=\"item\" class=\"radio\">\n      <input v-model=\"type\" :value=\"item\" type=\"radio\">\n      <span>{{ item }}</span>\n    </label>\n  </div>\n  <input v-model=\"input\" type=\"text\">\n  <pre lang=\"yaml\">{{ changeCase }}</pre>",
    "style": "input {\n  --tw-ring-offset-width: 1px !important;\n  --tw-ring-color: #8885 !important;\n  --tw-ring-offset-color: transparent !important;\n}\n\n.radio {\n  width: 7rem;\n  @apply ml-2;\n  @apply inline-flex items-center my-auto cursor-pointer select-none;\n}\n\n.radio input {\n  appearance: none;\n  padding: 0;\n  -webkit-print-color-adjust: exact;\n  color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  user-select: none;\n  flex-shrink: 0;\n  height: 1rem;\n  width: 1rem;\n  @apply bg-gray-400/30;\n  @apply rounded-full h-4 w-4 select-none relative;\n  @apply mr-1;\n}\n\n.radio input:checked::after {\n  content: \"\";\n  @apply absolute inset-[3px] rounded-full bg-primary;\n}\n\n.checkbox span {\n  @apply ml-1.5 text-13px opacity-70;\n}"
  }
]
