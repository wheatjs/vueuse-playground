export default [
  {
    "filename": "demo.vue",
    "script": "import { tryOnScopeDispose } from '@vueuse/shared'\nimport { BehaviorSubject } from 'rxjs'\nimport { onMounted, watch } from 'vue'\nimport { useSubject } from '.'\n\nconst countSubject = new BehaviorSubject(0)\nconst count = useSubject(countSubject)\n\nonMounted(() => {\n  // eslint-disable-next-line no-console\n  watch(count, value => console.info('from watcher:', value))\n\n  // eslint-disable-next-line no-console\n  const subscription = countSubject.subscribe(value => console.info('from subscriber: ', value))\n  tryOnScopeDispose(() => { subscription.unsubscribe() })\n})",
    "template": "<button @click=\"count++\">\n    count is: {{ count }}\n  </button>"
  }
]
