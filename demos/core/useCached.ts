export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useCached } from '@vueuse/core'\n\ninterface Value {\n  value: number\n  extra: number\n}\n\nconst value = ref<Value>({ value: 42, extra: 0 })\nconst comparator = (a: Value, b: Value) => a.value === b.value\nconst cachedValue = useCached(value, comparator)\n\nconst inputValue = ref(value.value.value)\nconst inputExtra = ref(value.value.extra)\n\nconst onSyncClick = () => {\n  value.value = {\n    value: inputValue.value,\n    extra: inputExtra.value,\n  }\n}\n",
    "templateContent": "\n  <div>\n    <div>\n      <div>Value: {{ value.value }}</div>\n      <div>Extra: {{ value.extra }}</div>\n      <div>Cached Value: {{ cachedValue.value }}</div>\n      <div>Cached Extra: {{ cachedValue.extra }}</div>\n\n      <div>\n        <label for=\"localValue\">Temp Value: </label>\n        <input id=\"localValue\" v-model.number=\"inputValue\">\n      </div>\n      <div>\n        <label for=\"localExtra\">Local Extra: </label>\n        <input id=\"localExtra\" v-model.number=\"inputExtra\">\n      </div>\n      <div>\n        <button @click=\"onSyncClick\">\n          Sync\n        </button>\n      </div>\n    </div>\n  </div>\n",
    "path": "packages/core/useCached/demo.vue"
  }
]
