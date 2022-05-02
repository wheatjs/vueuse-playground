export default [
  {
    "filename": "demo.vue",
    "script": "import { useEyeDropper } from '@vueuse/core'\n\nconst { isSupported, open, sRGBHex } = useEyeDropper()",
    "template": "<template v-if=\"isSupported\">\n    <div>isSupported: {{ isSupported }}</div>\n    <div>sRGBHex: <span :style=\"{ color: sRGBHex }\">{{ sRGBHex }}</span></div>\n  </template>\n  <div>\n    <button\n      :disabled=\"!isSupported\"\n      @click=\"() => open()\"\n    >\n      {{ isSupported ? 'Open Eye Dropper' : 'Not Supported by Your Browser' }}\n    </button>\n  </div>"
  }
]
