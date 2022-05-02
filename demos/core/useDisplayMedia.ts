export default [
  {
    "filename": "demo.vue",
    "script": "import { ref, watchEffect } from 'vue'\nimport { useDisplayMedia } from '@vueuse/core'\n\nconst video = ref<HTMLVideoElement>()\nconst { stream, enabled } = useDisplayMedia()\n\nwatchEffect(() => {\n  if (video.value)\n    video.value.srcObject = stream.value!\n})",
    "template": "<div class=\"flex flex-col gap-4 text-center\">\n    <div>\n      <button @click=\"enabled = !enabled\">\n        {{ enabled ? 'Stop' : 'Start' }} sharing my screen\n      </button>\n    </div>\n\n    <div>\n      <video\n        ref=\"video\"\n        muted\n        autoplay\n        controls\n        class=\"h-100 w-auto\"\n      />\n    </div>\n  </div>"
  }
]
