export default [
  {
    "filename": "demo.vue",
    "script": "import { reactive, ref } from 'vue'\nimport { stringify } from './utils'\nimport { useElementBounding } from '@vueuse/core'\n\nconst el = ref(null)\nconst rect = reactive(useElementBounding(el))\nconst text = stringify(rect)",
    "template": "<div style=\"min-height: 300px\">\n    <note class=\"mb-2\">\n      Resize the box to see changes\n    </note>\n    <textarea ref=\"el\" readonly class=\"resizer\" :value=\"text\" />\n  </div>"
  }
]
