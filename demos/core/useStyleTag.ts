export default [
  {
    "filename": "demo.vue",
    "script": "import { useStyleTag } from '@vueuse/core'\n\nconst { id, css, load, unload, isLoaded } = useStyleTag('.demo { background: #ad4c2e50 }')",
    "template": "<div>\n    Edit CSS:\n    <textarea v-model=\"css\" type=\"text\" rows=\"2\" class=\"w-full\" />\n  </div>\n  <button :disabled=\"isLoaded\" @click=\"load\">\n    Load\n  </button>\n  <button class=\"orange\" :disabled=\"!isLoaded\" @click=\"unload\">\n    Unload\n  </button>\n  <div class=\"usestyle-demo\">\n    <p>ID: <code>{{ id }}</code></p>\n    <p>Loaded: <code>{{ isLoaded }}</code></p>\n  </div>"
  }
]
