export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { syncRefs } from '@vueuse/core'\n\nconst source = ref('')\nconst target1 = ref('')\nconst target2 = ref('')\n\nsyncRefs(source, [target1, target2])\n",
    "templateContent": "\n  <div>\n    <input v-model=\"source\" placeholder=\"Source\" type=\"text\">\n    <input v-model=\"target1\" placeholder=\"Target1\" type=\"text\">\n    <input v-model=\"target2\" placeholder=\"Target2\" type=\"text\">\n  </div>\n",
    "path": "packages/shared/syncRefs/demo.vue"
  }
]
