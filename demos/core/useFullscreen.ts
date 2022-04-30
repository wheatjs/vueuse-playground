export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useFullscreen } from '@vueuse/core'\n\nconst el = ref(null)\nconst { toggle, isFullscreen } = useFullscreen(el)\n",
    "templateContent": "\n  <div class=\"text-center\">\n    <div class=\"flex\" p=\"y-4\">\n      <video\n        ref=\"el\"\n        class=\"m-auto rounded\"\n        src=\"https://vjs.zencdn.net/v/oceans.mp4\"\n        width=\"600\"\n        controls\n      />\n    </div>\n    <button @click=\"toggle\">\n      Go Fullscreen\n    </button>\n  </div>\n",
    "path": "packages/core/useFullscreen/demo.vue"
  }
]
