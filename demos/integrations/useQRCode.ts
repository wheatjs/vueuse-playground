export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useQRCode } from '.'\n\nconst text = ref('https://vueuse.org')\nconst qrcode = useQRCode(text, {\n  errorCorrectionLevel: 'H',\n  margin: 3,\n})",
    "template": "<note>\n    Text content for QRCode\n  </note>\n  <input v-model=\"text\" type=\"text\">\n  <img v-if=\"text\" class=\"mt-6 mb-2 rounded border\" :src=\"qrcode\" alt=\"QR Code\">"
  }
]
