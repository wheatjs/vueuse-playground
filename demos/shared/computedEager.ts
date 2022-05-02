export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { count } from './state'\nimport LazyDemo from './LazyDemo.vue'\nimport EagerDemo from './EagerDemo.vue'\n\nconst lazyRenders = ref(0)\nconst eagerRenders = ref(0)",
    "template": "<div grid grid-cols-2>\n    <div>\n      <span text-primary font-bold>Lazy Computed</span>\n      <div font-mono>\n        <LazyDemo @update=\"lazyRenders++\" />\n        <div>\n          Renders: {{ lazyRenders }}\n        </div>\n      </div>\n    </div>\n    <div>\n      <span text-primary font-bold>Eager Computed</span>\n      <div font-mono>\n        <EagerDemo @update=\"eagerRenders++\" />\n        <div>Renders: {{ eagerRenders }}</div>\n      </div>\n    </div>\n  </div>\n\n  <div mt-4 font-mono>\n    Count: {{ count }}\n  </div>\n  <button secondary @click=\"count--\">\n    Decrement\n  </button>\n  <button @click=\"count++\">\n    Increment\n  </button>"
  },
  {
    "filename": "EagerDemo.vue",
    "script": "import { onUpdated } from 'vue-demi'\nimport { computedEager } from '@vueuse/core'\nimport { count } from './state'\n\nconst emit = defineEmits(['update'])\nonUpdated(() => emit('update'))\n\nconst isOver10 = computedEager(() => count.value > 5)",
    "template": "<div>\n    Is over 5: <BooleanDisplay :value=\"isOver10\" />\n  </div>"
  },
  {
    "filename": "state.ts",
    "script": "import { ref } from 'vue-demi'\n\nexport const count = ref(0)"
  },
  {
    "filename": "LazyDemo.vue",
    "script": "import { computed, onUpdated } from 'vue-demi'\nimport { count } from './state'\n\nconst emit = defineEmits(['update'])\nonUpdated(() => emit('update'))\n\nconst isOver10 = computed(() => count.value > 5)",
    "template": "<div>\n    Is over 5: <BooleanDisplay :value=\"isOver10\" />\n  </div>"
  },
  {
    "filename": "state.ts",
    "script": "import { ref } from 'vue-demi'\n\nexport const count = ref(0)"
  },
  {
    "filename": "state.ts",
    "script": "import { ref } from 'vue-demi'\n\nexport const count = ref(0)"
  }
]
