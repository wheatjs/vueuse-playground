export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { reactive, ref } from 'vue'\nimport { useMouseInElement } from '@vueuse/core'\nimport Area from './Area.vue'\n\nconst target = ref(null)\nconst mouse = reactive(useMouseInElement(target))\nconst text = stringify(mouse)\n",
    "templateContent": "\n  <div flex=\"~\" gap=\"4\">\n    <Area ref=\"target\" />\n    <pre lang=\"yaml\">{{ text }}</pre>\n  </div>\n",
    "path": "packages/core/useMouseInElement/demo.vue"
  },
  {
    "name": "Area.vue",
    "templateContent": "\n  <div\n    class=\"el\"\n    w=\"40\"\n    h=\"40\"\n    bg=\"gray-400/20\"\n    border=\"rounded\"\n    flex=\"~\"\n    place=\"content-center\"\n    select=\"none\"\n  >\n    <div m=\"auto\">\n      Hover me\n    </div>\n  </div>\n",
    "path": "packages/core/useMouseInElement/Area.vue"
  }
]
