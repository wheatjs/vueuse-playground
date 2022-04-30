export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useDevicesList } from '@vueuse/core'\n\nconst {\n  videoInputs: cameras,\n  audioInputs: microphones,\n  audioOutputs: speakers,\n} = useDevicesList({\n  requestPermissions: true,\n})\n",
    "templateContent": "\n  <div class=\"grid grid-cols-3 text-center\" gap=\"2\" p=\"y-4\">\n    <carbon:camera />\n    <carbon:microphone />\n    <carbon:headphones />\n\n    <div class=\"title\">\n      Camera ({{ cameras.length }})\n    </div>\n    <div class=\"title\">\n      Microphones ({{ microphones.length }})\n    </div>\n    <div class=\"title\">\n      Speakers ({{ speakers.length }})\n    </div>\n\n    <div>\n      <div v-for=\"i of cameras\" :key=\"i.deviceId\" text=\"sm\">\n        {{ i.label }}\n      </div>\n    </div>\n\n    <div>\n      <div v-for=\"i of microphones\" :key=\"i.deviceId\" text=\"sm\">\n        {{ i.label }}\n      </div>\n    </div>\n\n    <div>\n      <div v-for=\"i of speakers\" :key=\"i.deviceId\" text=\"sm\">\n        {{ i.label }}\n      </div>\n    </div>\n  </div>\n",
    "styleContent": "\nsvg {\n  @apply text-2xl opacity-50 m-auto;\n}\n\n.title {\n  @apply opacity-50 uppercase tracking-wide text-sm;\n}\n",
    "path": "packages/core/useDevicesList/demo.vue"
  }
]
