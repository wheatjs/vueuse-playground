export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { computed, reactive } from 'vue'\nimport YAML from 'js-yaml'\nimport { usePermission } from '@vueuse/core'\n\nconst accelerometer = usePermission('accelerometer')\nconst accessibilityEvents = usePermission('accessibility-events')\nconst ambientLightSensor = usePermission('ambient-light-sensor')\nconst backgroundSync = usePermission('background-sync')\nconst camera = usePermission('camera')\nconst clipboardRead = usePermission('clipboard-read')\nconst clipboardWrite = usePermission('clipboard-write')\nconst gyroscope = usePermission('gyroscope')\nconst magnetometer = usePermission('magnetometer')\nconst microphone = usePermission('microphone')\nconst notifications = usePermission('notifications')\nconst paymentHandler = usePermission('payment-handler')\nconst persistentStorage = usePermission('persistent-storage')\nconst push = usePermission('push')\nconst speaker = usePermission('speaker')\n\nconst code = computed(() => YAML.dump(reactive({\n  accelerometer,\n  accessibilityEvents,\n  ambientLightSensor,\n  backgroundSync,\n  camera,\n  clipboardRead,\n  clipboardWrite,\n  gyroscope,\n  magnetometer,\n  microphone,\n  notifications,\n  paymentHandler,\n  persistentStorage,\n  push,\n  speaker,\n})))\n",
    "templateContent": "\n  <pre>{{ code }}</pre>\n",
    "path": "packages/core/usePermission/demo.vue"
  }
]
