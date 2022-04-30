export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useQRCode } from '.'\n\nconst text = ref('https://vueuse.org')\nconst qrcode = useQRCode(text, {\n  errorCorrectionLevel: 'H',\n  margin: 3,\n})\n",
    "templateContent": "\n  <note>\n    Text content for QRCode\n  </note>\n  <input v-model=\"text\" type=\"text\">\n  <img v-if=\"text\" class=\"mt-6 mb-2 rounded border\" :src=\"qrcode\" alt=\"QR Code\">\n",
    "path": "packages/integrations/useQRCode/demo.vue"
  }
]
