export default [
  {
    "filename": "demo.vue",
    "script": "import { computed, reactive } from 'vue'\nimport { useWakeLock } from '@vueuse/core'\n\nconst wakeLock = reactive(useWakeLock())\nconst text = computed(() => wakeLock.isActive ? 'OFF' : 'ON')\nconst onClick = () => wakeLock.isActive ? wakeLock.request('screen') : wakeLock.release()",
    "template": "<div>\n    Is Supported: <BooleanDisplay :value=\"wakeLock.isSupported\" />\n  </div>\n  <div>\n    Is Active: <BooleanDisplay :value=\"wakeLock.isActive\" />\n  </div>\n  <button @click=\"onClick\">\n    {{ text }}\n  </button>"
  }
]
