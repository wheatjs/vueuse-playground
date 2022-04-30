export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { onStartTyping, watchPausable } from '@vueuse/core'\n\nconst input = ref<HTMLInputElement | null>()\nconst log = ref('')\n\nconst source = ref('')\n\nconst watcher = watchPausable(\n  source,\n  v => (log.value += `Changed to \"${v}\"\\n`),\n)\n\nonStartTyping(() => input.value?.focus())\n\nconst clear = () => {\n  log.value = ''\n}\nconst pause = () => {\n  log.value += 'Paused\\n'\n  watcher.pause()\n}\nconst resume = () => {\n  log.value += 'Resumed\\n'\n  watcher.resume()\n}\n\nconst { isActive } = watcher\n",
    "templateContent": "\n  <div>\n    <note class=\"mb-2\">\n      Type something below to trigger the watch\n    </note>\n    <input\n      ref=\"input\"\n      v-model=\"source\"\n      type=\"text\"\n    >\n\n    <button :disabled=\"!isActive\" class=\"orange\" @click=\"pause\">\n      Pause\n    </button>\n    <button :disabled=\"isActive\" @click=\"resume\">\n      Resume\n    </button>\n    <button @click=\"clear\">\n      Clear Log\n    </button>\n\n    <br>\n    <br>\n\n    <note>Log</note>\n\n    <pre>{{ log }}</pre>\n  </div>\n",
    "path": "packages/shared/watchPausable/demo.vue"
  }
]
