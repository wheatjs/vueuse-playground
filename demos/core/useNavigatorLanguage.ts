export default [
  {
    "filename": "demo.vue",
    "script": "import { useNavigatorLanguage } from '@vueuse/core'\n\nconst { isSupported, language } = useNavigatorLanguage()",
    "template": "<p>\n    Supported: <BooleanDisplay :value=\"isSupported\" />\n  </p>\n  <note class=\"mb-2\">\n    Navigator Language:\n  </note>\n  <div v-if=\"isSupported\">\n    <code class=\"mr-2\">{{ language }}</code>\n  </div>\n  <div v-else>\n    The Navigator.language API is not supported in your browser.\n  </div>"
  }
]
