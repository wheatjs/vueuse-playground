export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useIntersectionObserver } from '@vueuse/core'\n\nconst root = ref(null)\nconst target = ref(null)\nconst isVisible = ref(false)\n\nuseIntersectionObserver(\n  target,\n  ([{ isIntersecting }]) => {\n    isVisible.value = isIntersecting\n  },\n  { root },\n)",
    "template": "<div ref=\"root\" class=\"root\">\n    <p class=\"notice\">\n      Scroll me down!\n    </p>\n    <div ref=\"target\" class=\"target\">\n      <p>Hello world!</p>\n    </div>\n  </div>\n  <div class=\"text-center\">\n    Element\n    <BooleanDisplay\n      :value=\"isVisible\"\n      true=\"inside\"\n      false=\"outside\"\n      class=\"font-bold\"\n    />\n    the viewport\n  </div>",
    "style": ".root {\n  border: 2px dashed #ccc;\n  height: 200px;\n  margin: 0 2rem 1rem;\n  overflow-y: scroll;\n}\n.notice {\n  text-align: center;\n  padding: 2em 0;\n  margin-bottom: 300px;\n  font-style: italic;\n  font-size: 1.2rem;\n  opacity: 0.8;\n}\n.target {\n  border: 2px dashed var(--c-brand);\n  padding: 10px;\n  max-height: 150px;\n  margin: 0 2rem 1rem;\n  margin-bottom: 400px;\n}"
  }
]
