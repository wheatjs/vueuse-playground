export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useClipboard } from '@vueuse/core'\nimport { usePermission } from '../usePermission'\n\nconst input = ref('')\n\nconst { text, isSupported, copy } = useClipboard()\nconst permissionRead = usePermission('clipboard-read')\nconst permissionWrite = usePermission('clipboard-write')\n",
    "templateContent": "\n  <div v-if=\"isSupported\">\n    <note>\n      Clipboard Permission: read <b>{{ permissionRead }}</b> | write\n      <b>{{ permissionWrite }}</b>\n    </note>\n    <p>\n      Current copied: <code>{{ text || 'none' }}</code>\n    </p>\n    <input v-model=\"input\" type=\"text\">\n    <button @click=\"copy(input)\">\n      Copy\n    </button>\n  </div>\n  <p v-else>\n    Your browser does not support Clipboard API\n  </p>\n",
    "path": "packages/core/useClipboard/demo.vue"
  }
]
