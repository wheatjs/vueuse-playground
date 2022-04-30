export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { timestamp, useLastChanged, useTimeAgo } from '@vueuse/core'\nimport { ref } from 'vue'\n\nconst input = ref('')\nconst ms = useLastChanged(input, { initialValue: timestamp() - 1000 * 60 * 5 })\nconst timeago = useTimeAgo(ms)\n",
    "templateContent": "\n  <div>\n    <input v-model=\"input\" type=\"text\" placeholder=\"Type anything...\">\n    <div>Last changed: <span class=\"text-primary\">{{ timeago }}</span> <span class=\"opacity-50 font-mono\">({{ ms }})</span></div>\n  </div>\n",
    "path": "packages/shared/useLastChanged/demo.vue"
  }
]
