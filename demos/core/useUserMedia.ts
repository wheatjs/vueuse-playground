export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref, watchEffect } from 'vue'\nimport { useUserMedia } from '@vueuse/core'\nimport { useDevicesList } from '../useDevicesList'\n\nconst currentCamera = ref<string>()\nconst { videoInputs: cameras } = useDevicesList({\n  requestPermissions: true,\n  onUpdated() {\n    if (!cameras.value.find(i => i.deviceId === currentCamera.value))\n      currentCamera.value = cameras.value[0]?.deviceId\n  },\n})\n\nconst video = ref<HTMLVideoElement>()\nconst { stream, enabled } = useUserMedia({\n  videoDeviceId: currentCamera,\n})\n\nwatchEffect(() => {\n  if (video.value)\n    video.value.srcObject = stream.value!\n})\n",
    "templateContent": "\n  <div class=\"flex flex-col gap-4 text-center\">\n    <div>\n      <button @click=\"enabled = !enabled\">\n        {{ enabled ? 'Stop' : 'Start' }}\n      </button>\n    </div>\n\n    <div>\n      <div\n        v-for=\"camera of cameras\"\n        :key=\"camera.deviceId\"\n        class=\"px-2 py-1 cursor-pointer\"\n        :class=\"{ 'text-primary': currentCamera === camera.deviceId }\"\n        @click=\"currentCamera = camera.deviceId\"\n      >\n        {{ camera.label }}\n      </div>\n    </div>\n    <div>\n      <video ref=\"video\" muted autoplay controls class=\"h-100 w-auto\" />\n    </div>\n  </div>\n",
    "path": "packages/core/useUserMedia/demo.vue"
  }
]
