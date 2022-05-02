export default [
  {
    "filename": "demo.vue",
    "script": "import { ref, watch } from 'vue'\nimport { useBroadcastChannel } from '@vueuse/core'\n\nconst {\n  isSupported,\n  data,\n  post,\n  error,\n} = useBroadcastChannel({ name: 'vueuse-demo-channel' })\n\nconst message = ref('')\n\nwatch(data, () => {\n  if (data.value)\n    alert(data.value)\n})",
    "template": "<div>\n    <p>\n      Supported:\n      <b>{{ isSupported }}</b>\n    </p>\n\n    <p>Please open this page in at least two tabs</p>\n  </div>\n\n  <div v-if=\"isSupported\">\n    <form @submit.prevent=\"post(message)\">\n      <input v-model=\"message\" type=\"text\">\n      <button type=\"submit\">\n        Send Message\n      </button>\n    </form>\n\n    <p v-if=\"data\">\n      received: {{ data }}\n    </p>\n\n    <p v-if=\"error\">\n      error: {{ error }}\n    </p>\n  </div>\n  <div v-else>\n    Aww, snap! The Broadcast Channel Web API is not supported in your browser.\n  </div>"
  }
]
