export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { computed, reactive } from 'vue'\nimport { useDeviceMotion } from '@vueuse/core'\n\nconst motion = reactive(useDeviceMotion())\nconst text = computed(() => JSON.stringify(motion, null, 2))\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Device Motion:\n  </note>\n  <pre lang=\"json\">{{ text }}</pre>\n",
    "path": "packages/core/useDeviceMotion/demo.vue"
  }
]
