export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { isClient } from '@vueuse/shared'\nimport { useShare } from '@vueuse/core'\n\nconst options = ref({\n  title: 'VueUse',\n  text: 'Collection of essential Vue Composition Utilities!',\n  url: isClient ? location.href : '',\n})\n\nconst { share, isSupported } = useShare(options)\n\nconst startShare = () => share().catch(err => err)\n",
    "templateContent": "\n  <div>\n    <input\n      v-if=\"isSupported\"\n      v-model=\"options.text\"\n      type=\"text\"\n      placeholder=\"Note\"\n    >\n    <button :disabled=\"!isSupported\" @click=\"startShare\">\n      {{ isSupported ? 'Share' : 'Web share is not supported in your browser' }}\n    </button>\n  </div>\n",
    "path": "packages/core/useShare/demo.vue"
  }
]
