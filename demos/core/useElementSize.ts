export default [
  {
    "filename": "demo.vue",
    "script": "import { reactive, ref } from 'vue'\nimport { stringify } from './utils'\nimport { useElementSize } from '@vueuse/core'\n\nconst el = ref(null)\nconst size = reactive(useElementSize(el))\nconst text = stringify(size)",
    "template": "<note class=\"mb-2\">\n    Resize the box to see changes\n  </note>\n  <textarea ref=\"el\" class=\"resizer\" v-text=\"text\" />"
  }
]
