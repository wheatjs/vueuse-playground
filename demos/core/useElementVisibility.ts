export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useElementVisibility } from '@vueuse/core'\n\nconst el = ref(null)\nconst isVisible = useElementVisibility(el)",
    "template": "<div>\n    <note class=\"mb-2\">\n      Info on the right bottom corner\n    </note>\n    <div ref=\"el\" class=\"max-w-100 relative area bg-white dark:bg-gray-800 shadow-lg z-60\">\n      Target Element (scroll down)\n    </div>\n  </div>\n  <div class=\"float m-3 area shadow-lg\">\n    Element\n    <BooleanDisplay\n      :value=\"isVisible\"\n      true=\"inside\"\n      false=\"outside\"\n      class=\"font-bold\"\n    />\n    the viewport\n  </div>"
  }
]
