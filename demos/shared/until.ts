export default [
  {
    "filename": "demo.vue",
    "script": "import { invoke, until, useCounter } from '@vueuse/shared'\n\nconst { count, inc, dec } = useCounter()\n\ninvoke(async() => {\n  await until(count).toBe(7)\n\n  alert('You got 7!')\n})",
    "template": "<note>Add to 7 to show the alert.</note>\n  <p>Count: {{ count }}</p>\n  <button @click=\"inc()\">\n    Increment\n  </button>\n  <button @click=\"dec()\">\n    Decrement\n  </button>"
  }
]
