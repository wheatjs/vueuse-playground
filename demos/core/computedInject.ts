export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { provide, ref } from 'vue'\nimport Receiver, { ArrayKey } from './demoReceiver.vue'\n\nconst array = ref([{ key: 1, value: '1' }, { key: 2, value: '2' }, { key: 3, value: '3' }])\n\nprovide(ArrayKey, array)\n",
    "templateContent": "\n  <div grid md:grid-cols-2 grid-cols-1 gap-4>\n    <div md:border=\"0 r-1 dark:(black opacity-50)\">\n      <div text-primary font-bold mb-2>\n        Array\n      </div>\n      <pre>{{ array }}</pre>\n    </div>\n    <Receiver />\n  </div>\n",
    "path": "packages/core/computedInject/demo.vue"
  },
  {
    "name": "demoReceiver.vue",
    "scriptContent": "\nimport type { InjectionKey, Ref } from 'vue-demi'\nimport { defineComponent, ref } from 'vue-demi'\nimport { computedInject } from './index'\n\ntype OptionsRef = Ref<{ key: number; value: string }[]>\n\nexport const ArrayKey: InjectionKey<OptionsRef> = Symbol('array')\n\nexport default defineComponent({\n  name: 'DemoProvider',\n  setup() {\n    const computedArr = computedInject(ArrayKey, (source) => {\n      if (!source)\n        return ref([]) as OptionsRef\n      const arr = [...source.value]\n      arr.unshift({ key: 0, value: 'all' })\n      return arr\n    })\n\n    return {\n      computedArr,\n    }\n  },\n})\n",
    "templateContent": "\n  <div>\n    <div text-primary font-bold mb-2>\n      Computed Array\n    </div>\n    <pre>{{ computedArr }}</pre>\n  </div>\n",
    "path": "packages/core/computedInject/demoReceiver.vue"
  },
  {
    "name": "index.ts",
    "scriptContent": "import type { ComputedRef, InjectionKey } from 'vue-demi'\nimport { computed, inject } from 'vue-demi'\n\nexport type ComputedInjectGetter<T, K> = (source: T | undefined, ctx?: any) => K\nexport type ComputedInjectGetterWithDefault<T, K> = (source: T, ctx?: any) => K\nexport type ComputedInjectSetter<T> = (v: T) => void\n\nexport interface WritableComputedInjectOptions<T, K> {\n  get: ComputedInjectGetter<T, K>\n  set: ComputedInjectSetter<K>\n}\n\nexport interface WritableComputedInjectOptionsWithDefault<T, K> {\n  get: ComputedInjectGetterWithDefault<T, K>\n  set: ComputedInjectSetter<K>\n}\n\nexport function computedInject<T, K = any>(\n  key: InjectionKey<T> | string,\n  getter: ComputedInjectGetter<T, K>\n): ComputedRef<K | undefined>\nexport function computedInject<T, K = any>(\n  key: InjectionKey<T> | string,\n  options: WritableComputedInjectOptions<T, K>\n): ComputedRef<K | undefined>\nexport function computedInject<T, K = any>(\n  key: InjectionKey<T> | string,\n  getter: ComputedInjectGetterWithDefault<T, K>,\n  defaultSource: T,\n  treatDefaultAsFactory?: false\n): ComputedRef<K>\nexport function computedInject<T, K = any>(\n  key: InjectionKey<T> | string,\n  options: WritableComputedInjectOptionsWithDefault<T, K>,\n  defaultSource: T | (() => T),\n  treatDefaultAsFactory: true\n): ComputedRef<K>\nexport function computedInject<T, K = any>(\n  key: InjectionKey<T> | string,\n  options: ComputedInjectGetter<T, K> | WritableComputedInjectOptions<T, K>,\n  defaultSource?: T | (() => T),\n  treatDefaultAsFactory?: boolean,\n) {\n  let source = inject(key) as T | undefined\n  if (defaultSource)\n    source = inject(key, defaultSource) as T\n  if (treatDefaultAsFactory)\n    source = inject(key, defaultSource, treatDefaultAsFactory) as T\n\n  if (typeof options === 'function') {\n    return computed(ctx => options(source, ctx))\n  }\n  else {\n    return computed({\n      get: ctx => options.get(source, ctx),\n      set: options.set,\n    })\n  }\n}\n",
    "path": "packages/core/computedInject/index.ts"
  }
]
