export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useEyeDropper } from '@vueuse/core'\n\nconst { isSupported, open, sRGBHex } = useEyeDropper()\n",
    "templateContent": "\n  <template v-if=\"isSupported\">\n    <div>isSupported: {{ isSupported }}</div>\n    <div>sRGBHex: <span :style=\"{ color: sRGBHex }\">{{ sRGBHex }}</span></div>\n  </template>\n  <div>\n    <button\n      :disabled=\"!isSupported\"\n      @click=\"() => open()\"\n    >\n      {{ isSupported ? 'Open Eye Dropper' : 'Not Supported by Your Browser' }}\n    </button>\n  </div>\n",
    "path": "packages/core/useEyeDropper/demo.vue"
  }
]
