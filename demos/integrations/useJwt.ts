export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\n\nimport { useJwt } from '.'\n\nconst encodedJwt = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.L8i6g3PfcHlioHCCPURC9pmXT7gdJpx3kOoyAfNUwCc')\nconst { header, payload } = useJwt(encodedJwt)",
    "template": "<div>\n    <p>Header</p>\n    <pre lang=\"json\" class=\"ml-2\">{{ JSON.stringify(header, null, 2) }}</pre>\n    <p>Payload</p>\n    <pre lang=\"json\" class=\"ml-2\">{{ JSON.stringify(payload, null, 2) }}</pre>\n  </div>"
  }
]
