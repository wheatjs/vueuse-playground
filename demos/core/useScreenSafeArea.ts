export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useScreenSafeArea } from '@vueuse/core'\n\nconst {\n  top,\n  right,\n  bottom,\n  left,\n} = useScreenSafeArea()\n",
    "templateContent": "\n  <div class=\"inline-grid grid-cols-2 gap-x-4 gap-y-2\">\n    <div opacity=\"50\">\n      top:\n    </div>\n    <div>{{ top }}</div>\n    <div opacity=\"50\">\n      right:\n    </div>\n    <div>{{ right }}</div>\n    <div opacity=\"50\">\n      bottom:\n    </div>\n    <div>{{ bottom }}</div>\n    <div opacity=\"50\">\n      left:\n    </div>\n    <div>{{ left }}</div>\n  </div>\n",
    "path": "packages/core/useScreenSafeArea/demo.vue"
  }
]
