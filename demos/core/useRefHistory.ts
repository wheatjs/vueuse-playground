export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useCounter } from '@vueuse/shared'\nimport dayjs from 'dayjs'\nimport { useRefHistory } from '@vueuse/core'\n\nconst format = (ts: number) => dayjs(ts).format()\n\nconst { count, inc, dec } = useCounter()\nconst { history, undo, redo, canUndo, canRedo } = useRefHistory(count, { capacity: 10 })\n",
    "templateContent": "\n  <div>Count: {{ count }}</div>\n  <button @click=\"inc()\">\n    Increment\n  </button>\n  <button @click=\"dec()\">\n    Decrement\n  </button>\n  <span class=\"ml-2\">/</span>\n  <button :disabled=\"!canUndo\" @click=\"undo()\">\n    Undo\n  </button>\n  <button :disabled=\"!canRedo\" @click=\"redo()\">\n    Redo\n  </button>\n  <br>\n  <br>\n  <note>History (limited to 10 records for demo)</note>\n  <div class=\"code-block mt-4\">\n    <div v-for=\"i in history\" :key=\"i.timestamp\">\n      <span class=\"opacity-50 mr-2 font-mono\">{{ format(i.timestamp) }}</span>\n      <span class=\"font-mono\">{ value: {{ i.snapshot }} }</span>\n    </div>\n  </div>\n",
    "path": "packages/core/useRefHistory/demo.vue"
  }
]
