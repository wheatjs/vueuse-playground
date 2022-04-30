export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useMemory } from '@vueuse/core'\n\nconst size = (v: number) => {\n  const kb = v / 1024 / 1024\n  return `${kb.toFixed(2)} MB`\n}\nconst { isSupported, memory } = useMemory()\n",
    "templateContent": "\n  <div v-if=\"isSupported && memory\" class=\"inline-grid grid-cols-2 gap-x-4 gap-y-2\">\n    <template v-if=\"memory\">\n      <div opacity=\"50\">\n        Used\n      </div><div>{{ size(memory.usedJSHeapSize) }}</div>\n      <div opacity=\"50\">\n        Allocated\n      </div><div>{{ size(memory.totalJSHeapSize) }}</div>\n      <div opacity=\"50\">\n        Limit\n      </div><div>{{ size(memory.jsHeapSizeLimit) }}</div>\n    </template>\n  </div>\n  <div v-else>\n    Your browser does not support performance memory API\n  </div>\n",
    "path": "packages/core/useMemory/demo.vue"
  }
]
