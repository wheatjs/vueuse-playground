export default [
  {
    "filename": "demo.vue",
    "script": "import { computed } from 'vue'\nimport { useOnline } from '@vueuse/core'\n\nconst online = useOnline()\n\nconst clazz = computed(() => online.value ? 'text-primary' : 'text-gray')\nconst text = computed(() => online.value ? 'Online' : 'Offline')",
    "template": "<note class=\"mb-2\">\n    Disconnect your network to see changes\n  </note>\n  <div>Status: <b :class=\"clazz\">{{ text }}</b></div>"
  }
]
