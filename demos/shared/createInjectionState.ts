export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport RootComponent from './demo/RootComponent.vue'\nimport CountComponent from './demo/CountComponent.vue'\nimport ButtonComponent from './demo/ButtonComponent.vue'\n",
    "templateContent": "\n  <div>\n    <RootComponent>\n      <ButtonComponent />\n      <CountComponent />\n    </RootComponent>\n  </div>\n",
    "path": "packages/shared/createInjectionState/demo.vue"
  },
  {
    "name": "ButtonComponent.vue",
    "scriptContent": "\nimport { useCounterStore } from './useCounterStore'\n\n// use non-null assertion operator to ignore the case that store is not provided.\nconst { increment } = useCounterStore()!\n\n",
    "templateContent": "\n  <button @click=\"increment\">\n    +\n  </button>\n",
    "path": "packages/shared/createInjectionState/demo/ButtonComponent.vue"
  },
  {
    "name": "useCounterStore.ts",
    "scriptContent": "import { computed, ref } from 'vue-demi'\nimport { createInjectionState } from '@vueuse/shared'\n\nconst [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {\n  // state\n  const count = ref(initialValue)\n\n  // getters\n  const double = computed(() => count.value * 2)\n\n  // actions\n  function increment() {\n    count.value++\n  }\n\n  return { count, double, increment }\n})\n\nexport { useProvideCounterStore }\n// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`\nexport { useCounterStore }\n\nexport function useCounterStoreWithDefaultValue() {\n  return useCounterStore() ?? {\n    count: ref(0),\n    double: ref(0),\n    increment: () => {},\n  }\n}\n\nexport function useCounterStoreOrThrow() {\n  const counterStore = useCounterStore()\n  if (counterStore == null)\n    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')\n  return counterStore\n}\n",
    "path": "packages/shared/createInjectionState/demo/useCounterStore.ts"
  },
  {
    "name": "CountComponent.vue",
    "scriptContent": "\nimport { useCounterStore } from './useCounterStore'\n\n// use non-null assertion operator to ignore the case that store is not provided.\nconst { count, double } = useCounterStore()!\n// if you want to allow component to working without providing store, you can use follow code instead:\n// const { count, double } = useCounterStore() ?? { count: ref(0), double: ref(0) }\n// also, you can use another hook to provide default value\n// const { count, double } = useCounterStoreWithDefaultValue()\n// or throw error\n// const { count, double } = useCounterStoreOrThrow()\n\n",
    "templateContent": "\n  <ul>\n    <li>\n      count: {{ count }}\n    </li>\n    <li>\n      double: {{ double }}\n    </li>\n  </ul>\n",
    "path": "packages/shared/createInjectionState/demo/CountComponent.vue"
  },
  {
    "name": "useCounterStore.ts",
    "scriptContent": "import { computed, ref } from 'vue-demi'\nimport { createInjectionState } from '@vueuse/shared'\n\nconst [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {\n  // state\n  const count = ref(initialValue)\n\n  // getters\n  const double = computed(() => count.value * 2)\n\n  // actions\n  function increment() {\n    count.value++\n  }\n\n  return { count, double, increment }\n})\n\nexport { useProvideCounterStore }\n// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`\nexport { useCounterStore }\n\nexport function useCounterStoreWithDefaultValue() {\n  return useCounterStore() ?? {\n    count: ref(0),\n    double: ref(0),\n    increment: () => {},\n  }\n}\n\nexport function useCounterStoreOrThrow() {\n  const counterStore = useCounterStore()\n  if (counterStore == null)\n    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')\n  return counterStore\n}\n",
    "path": "packages/shared/createInjectionState/demo/useCounterStore.ts"
  },
  {
    "name": "RootComponent.vue",
    "scriptContent": "\nimport { useProvideCounterStore } from './useCounterStore'\n\nuseProvideCounterStore(0)\n",
    "templateContent": "\n  <div>\n    <slot />\n  </div>\n",
    "path": "packages/shared/createInjectionState/demo/RootComponent.vue"
  },
  {
    "name": "useCounterStore.ts",
    "scriptContent": "import { computed, ref } from 'vue-demi'\nimport { createInjectionState } from '@vueuse/shared'\n\nconst [useProvideCounterStore, useCounterStore] = createInjectionState((initialValue: number) => {\n  // state\n  const count = ref(initialValue)\n\n  // getters\n  const double = computed(() => count.value * 2)\n\n  // actions\n  function increment() {\n    count.value++\n  }\n\n  return { count, double, increment }\n})\n\nexport { useProvideCounterStore }\n// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`\nexport { useCounterStore }\n\nexport function useCounterStoreWithDefaultValue() {\n  return useCounterStore() ?? {\n    count: ref(0),\n    double: ref(0),\n    increment: () => {},\n  }\n}\n\nexport function useCounterStoreOrThrow() {\n  const counterStore = useCounterStore()\n  if (counterStore == null)\n    throw new Error('Please call `useProvideCounterStore` on the appropriate parent component')\n  return counterStore\n}\n",
    "path": "packages/shared/createInjectionState/demo/useCounterStore.ts"
  }
]
