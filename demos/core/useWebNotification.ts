export default [
  {
    "filename": "demo.vue",
    "script": "import { useWebNotification } from '@vueuse/core'\nimport type { UseWebNotificationOptions } from '@vueuse/core'\n\nconst options: UseWebNotificationOptions = {\n  title: 'Hello, world from VueUse!',\n  dir: 'auto',\n  lang: 'en',\n  renotify: true,\n  tag: 'test',\n}\n\nconst {\n  isSupported,\n  show,\n} = useWebNotification(options)",
    "template": "<div>\n    <p>\n      Supported: <BooleanDisplay :value=\"isSupported\" />\n    </p>\n  </div>\n\n  <div v-if=\"isSupported\">\n    <button @click=\"show()\">\n      Show Notification\n    </button>\n  </div>\n  <div v-else>\n    The Notification Web API is not supported in your browser.\n  </div>"
  }
]
