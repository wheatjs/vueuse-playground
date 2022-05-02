export default [
  {
    "filename": "demo.vue",
    "script": "import { useCounter } from '@vueuse/core'\n\nconst { count, inc, dec, set, reset } = useCounter()",
    "template": "<div>\n    <p>Count: {{ count }}</p>\n    <button @click=\"inc()\">\n      Increment\n    </button>\n    <button @click=\"dec()\">\n      Decrement\n    </button>\n    <button @click=\"inc(5)\">\n      Increment (+5)\n    </button>\n    <button @click=\"dec(5)\">\n      Decrement (-5)\n    </button>\n    <button @click=\"set(100)\">\n      Set (100)\n    </button>\n    <button @click=\"reset()\">\n      Reset\n    </button>\n  </div>"
  }
]
