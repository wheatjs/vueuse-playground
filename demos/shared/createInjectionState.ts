export default [
  {
    "filename": "demo.vue",
    "script": "import RootComponent from './RootComponent.vue'\nimport CountComponent from './CountComponent.vue'\nimport ButtonComponent from './ButtonComponent.vue'",
    "template": "<div>\n    <RootComponent>\n      <ButtonComponent />\n      <CountComponent />\n    </RootComponent>\n  </div>"
  },
  {
    "filename": "ButtonComponent.vue",
    "script": "import { useCounterStore } from './useCounterStore'\n\n// use non-null assertion operator to ignore the case that store is not provided.\nconst { increment } = useCounterStore()!",
    "template": "<button @click=\"increment\">\n    +\n  </button>"
  },
  {
    "filename": "useCounterStore.ts",
    "script": "import { computed, ref } from 'vue-demi'\nimport { createInjectionState } from '@vueuse/shared'\n\nconst [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {\n  // state\n  const count = ref(initialValue)\n\n  // getters\n  const double = computed(() => count.value * 2)\n\n  // actions\n  function increment() {\n    count.value++\n  }\n\n  return { count, double, increment }\n})\n\nexport { useProvideCounterStore }\n// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`\nexport { useCounterStore }\n\nexport function useCounterStoreWithDefaultValue() {\n  return useCounterStore() ?? {\n    count: ref(0),\n    double: ref(0),\n    increment: () => {},\n  }\n}\n\nexport function useCounterStoreOrThrow() {\n  const counterStore = useCounterStore()\n  if (counterStore == null)\n    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')\n  return counterStore\n}"
  },
  {
    "filename": "CountComponent.vue",
    "script": "import { useCounterStore } from './useCounterStore'\n\n// use non-null assertion operator to ignore the case that store is not provided.\nconst { count, double } = useCounterStore()!\n// if you want to allow component to working without providing store, you can use follow code instead:\n// const { count, double } = useCounterStore() ?? { count: ref(0), double: ref(0) }\n// also, you can use another hook to provide default value\n// const { count, double } = useCounterStoreWithDefaultValue()\n// or throw error\n// const { count, double } = useCounterStoreOrThrow()",
    "template": "<ul>\n    <li>\n      count: {{ count }}\n    </li>\n    <li>\n      double: {{ double }}\n    </li>\n  </ul>"
  },
  {
    "filename": "useCounterStore.ts",
    "script": "import { computed, ref } from 'vue-demi'\nimport { createInjectionState } from '@vueuse/shared'\n\nconst [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {\n  // state\n  const count = ref(initialValue)\n\n  // getters\n  const double = computed(() => count.value * 2)\n\n  // actions\n  function increment() {\n    count.value++\n  }\n\n  return { count, double, increment }\n})\n\nexport { useProvideCounterStore }\n// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`\nexport { useCounterStore }\n\nexport function useCounterStoreWithDefaultValue() {\n  return useCounterStore() ?? {\n    count: ref(0),\n    double: ref(0),\n    increment: () => {},\n  }\n}\n\nexport function useCounterStoreOrThrow() {\n  const counterStore = useCounterStore()\n  if (counterStore == null)\n    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')\n  return counterStore\n}"
  },
  {
    "filename": "RootComponent.vue",
    "script": "import { useProvideCounterStore } from './useCounterStore'\n\nuseProvideCounterStore(0)",
    "template": "<div>\n    <slot />\n  </div>"
  },
  {
    "filename": "useCounterStore.ts",
    "script": "import { computed, ref } from 'vue-demi'\nimport { createInjectionState } from '@vueuse/shared'\n\nconst [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {\n  // state\n  const count = ref(initialValue)\n\n  // getters\n  const double = computed(() => count.value * 2)\n\n  // actions\n  function increment() {\n    count.value++\n  }\n\n  return { count, double, increment }\n})\n\nexport { useProvideCounterStore }\n// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`\nexport { useCounterStore }\n\nexport function useCounterStoreWithDefaultValue() {\n  return useCounterStore() ?? {\n    count: ref(0),\n    double: ref(0),\n    increment: () => {},\n  }\n}\n\nexport function useCounterStoreOrThrow() {\n  const counterStore = useCounterStore()\n  if (counterStore == null)\n    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')\n  return counterStore\n}"
  }
]
