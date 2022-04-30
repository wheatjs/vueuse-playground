export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { computed } from 'vue'\nimport { useOnline } from '@vueuse/core'\n\nconst online = useOnline()\n\nconst clazz = computed(() => online.value ? 'text-primary' : 'text-gray')\nconst text = computed(() => online.value ? 'Online' : 'Offline')\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Disconnect your network to see changes\n  </note>\n  <div>Status: <b :class=\"clazz\">{{ text }}</b></div>\n",
    "path": "packages/core/useOnline/demo.vue"
  }
]
