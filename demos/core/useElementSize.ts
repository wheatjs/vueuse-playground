export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { reactive, ref } from 'vue'\nimport { stringify } from '@vueuse/docs-utils'\nimport { useElementSize } from '@vueuse/core'\n\nconst el = ref(null)\nconst size = reactive(useElementSize(el))\nconst text = stringify(size)\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    Resize the box to see changes\n  </note>\n  <textarea ref=\"el\" class=\"resizer\" v-text=\"text\" />\n",
    "path": "packages/core/useElementSize/demo.vue"
  }
]
