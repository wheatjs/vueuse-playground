export default [
  {
    "filename": "demo.vue",
    "script": "import { useDevicesList } from '@vueuse/core'\n\nconst {\n  videoInputs: cameras,\n  audioInputs: microphones,\n  audioOutputs: speakers,\n} = useDevicesList({\n  requestPermissions: true,\n})",
    "template": "<div class=\"grid grid-cols-3 text-center\" gap=\"2\" p=\"y-4\">\n    <i i-carbon-camera />\n    <i i-carbon-microphone />\n    <i i-carbon-headphones />\n\n    <div class=\"title\">\n      Camera ({{ cameras.length }})\n    </div>\n    <div class=\"title\">\n      Microphones ({{ microphones.length }})\n    </div>\n    <div class=\"title\">\n      Speakers ({{ speakers.length }})\n    </div>\n\n    <div>\n      <div v-for=\"i of cameras\" :key=\"i.deviceId\" text=\"sm\">\n        {{ i.label }}\n      </div>\n    </div>\n\n    <div>\n      <div v-for=\"i of microphones\" :key=\"i.deviceId\" text=\"sm\">\n        {{ i.label }}\n      </div>\n    </div>\n\n    <div>\n      <div v-for=\"i of speakers\" :key=\"i.deviceId\" text=\"sm\">\n        {{ i.label }}\n      </div>\n    </div>\n  </div>",
    "style": "i {\n  @apply text-2xl opacity-50 m-auto;\n}\n\n.title {\n  @apply opacity-50 uppercase tracking-wide text-sm;\n}"
  }
]
