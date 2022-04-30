export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { until, useCounter } from '@vueuse/shared'\nimport { invoke } from '../utils'\n\nconst { count, inc, dec } = useCounter()\n\ninvoke(async() => {\n  await until(count).toBe(7)\n\n  alert('You got 7!')\n})\n",
    "templateContent": "\n  <note>Add to 7 to show the alert.</note>\n  <p>Count: {{ count }}</p>\n  <button @click=\"inc()\">\n    Increment\n  </button>\n  <button @click=\"dec()\">\n    Decrement\n  </button>\n",
    "path": "packages/shared/until/demo.vue"
  }
]
