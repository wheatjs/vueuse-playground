export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { count } from './demo/state'\nimport LazyDemo from './demo/LazyDemo.vue'\nimport EagerDemo from './demo/EagerDemo.vue'\n\nconst lazyRenders = ref(0)\nconst eagerRenders = ref(0)\n",
    "templateContent": "\n  <div grid grid-cols-2>\n    <div>\n      <span text-primary font-bold>Lazy Computed</span>\n      <div font-mono>\n        <LazyDemo @update=\"lazyRenders++\" />\n        <div>\n          Renders: {{ lazyRenders }}\n        </div>\n      </div>\n    </div>\n    <div>\n      <span text-primary font-bold>Eager Computed</span>\n      <div font-mono>\n        <EagerDemo @update=\"eagerRenders++\" />\n        <div>Renders: {{ eagerRenders }}</div>\n      </div>\n    </div>\n  </div>\n\n  <div mt-4 font-mono>\n    Count: {{ count }}\n  </div>\n  <button secondary @click=\"count--\">\n    Decrement\n  </button>\n  <button @click=\"count++\">\n    Increment\n  </button>\n",
    "path": "packages/shared/computedEager/demo.vue"
  },
  {
    "name": "EagerDemo.vue",
    "scriptContent": "\nimport { onUpdated } from 'vue-demi'\nimport { computedEager } from '../index'\nimport { count } from './state'\n\nconst emit = defineEmits(['update'])\nonUpdated(() => emit('update'))\n\nconst isOver10 = computedEager(() => count.value > 5)\n",
    "templateContent": "\n  <div>\n    Is over 5: <BooleanDisplay :value=\"isOver10\" />\n  </div>\n",
    "path": "packages/shared/computedEager/demo/EagerDemo.vue"
  },
  {
    "name": "state.ts",
    "scriptContent": "import { ref } from 'vue-demi'\n\nexport const count = ref(0)\n",
    "path": "packages/shared/computedEager/demo/state.ts"
  },
  {
    "name": "LazyDemo.vue",
    "scriptContent": "\nimport { computed, onUpdated } from 'vue-demi'\nimport { count } from './state'\n\nconst emit = defineEmits(['update'])\nonUpdated(() => emit('update'))\n\nconst isOver10 = computed(() => count.value > 5)\n",
    "templateContent": "\n  <div>\n    Is over 5: <BooleanDisplay :value=\"isOver10\" />\n  </div>\n",
    "path": "packages/shared/computedEager/demo/LazyDemo.vue"
  },
  {
    "name": "state.ts",
    "scriptContent": "import { ref } from 'vue-demi'\n\nexport const count = ref(0)\n",
    "path": "packages/shared/computedEager/demo/state.ts"
  },
  {
    "name": "state.ts",
    "scriptContent": "import { ref } from 'vue-demi'\n\nexport const count = ref(0)\n",
    "path": "packages/shared/computedEager/demo/state.ts"
  }
]
