export default [
  {
    "filename": "demo.vue",
    "script": "import { stringify } from './utils'\nimport { reactive, ref } from 'vue'\nimport { useMouseInElement } from '@vueuse/core'\nimport Area from './Area.vue'\n\nconst target = ref(null)\nconst mouse = reactive(useMouseInElement(target))\nconst text = stringify(mouse)",
    "template": "<div flex=\"~\" gap=\"4\">\n    <Area ref=\"target\" />\n    <pre lang=\"yaml\">{{ text }}</pre>\n  </div>"
  },
  {
    "filename": "Area.vue",
    "template": "<div\n    class=\"el\"\n    w=\"40\"\n    h=\"40\"\n    bg=\"gray-400/20\"\n    border=\"rounded\"\n    flex=\"~\"\n    place=\"content-center\"\n    select=\"none\"\n  >\n    <div m=\"auto\">\n      Hover me\n    </div>\n  </div>"
  }
]
