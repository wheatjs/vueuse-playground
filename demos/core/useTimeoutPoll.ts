export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { promiseTimeout } from '@vueuse/shared'\nimport { useTimeoutPoll } from '@vueuse/core'\n\nconst count = ref(0)\n\nconst fetchData = async() => {\n  await promiseTimeout(1000)\n  count.value++\n}\n\nconst { isActive, pause, resume } = useTimeoutPoll(fetchData, 1000)\n\n",
    "templateContent": "\n  <div>\n    <div>Count: {{ count }}</div>\n    <div>isActive: {{ isActive }}</div>\n    <div>\n      <button @click=\"pause\">\n        pause\n      </button>\n      <button @click=\"resume\">\n        resume\n      </button>\n    </div>\n  </div>\n",
    "path": "packages/core/useTimeoutPoll/demo.vue"
  }
]
