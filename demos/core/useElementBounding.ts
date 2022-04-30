export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { reactive, ref } from 'vue'\nimport { stringify } from '@vueuse/docs-utils'\nimport { useElementBounding } from '@vueuse/core'\n\nconst el = ref(null)\nconst rect = reactive(useElementBounding(el))\nconst text = stringify(rect)\n",
    "templateContent": "\n  <div style=\"min-height: 300px\">\n    <note class=\"mb-2\">\n      Resize the box to see changes\n    </note>\n    <textarea ref=\"el\" readonly class=\"resizer\" :value=\"text\" />\n  </div>\n",
    "path": "packages/core/useElementBounding/demo.vue"
  }
]
