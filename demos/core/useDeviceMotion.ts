export default [
  {
    "filename": "demo.vue",
    "script": "import { computed, reactive } from 'vue'\nimport { useDeviceMotion } from '@vueuse/core'\n\nconst motion = reactive(useDeviceMotion())\nconst text = computed(() => JSON.stringify(motion, null, 2))",
    "template": "<note class=\"mb-2\">\n    Device Motion:\n  </note>\n  <pre lang=\"json\">{{ text }}</pre>"
  }
]
