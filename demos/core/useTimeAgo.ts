export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { timestamp } from '@vueuse/shared'\nimport { computed, ref } from 'vue'\nimport { useTimeAgo } from '@vueuse/core'\n\nconst slider = ref(0)\nconst value = computed(() => timestamp() + slider.value ** 3)\nconst timeAgo = useTimeAgo(value)\n",
    "templateContent": "\n  <div class=\"text-primary text-center\">\n    {{ timeAgo }}\n  </div>\n  <input v-model=\"slider\" class=\"slider\" type=\"range\" min=\"-3800\" max=\"3800\">\n  <div class=\"text-center opacity-50\">\n    {{ slider ** 3 }}ms\n  </div>\n",
    "styleContent": "\n.slider {\n  -webkit-appearance: none;\n  width: 100%;\n  background: rgba(125, 125, 125, 0.1);\n  border-radius: 1rem;\n  height: 1rem;\n  opacity: 0.8;\n  margin: 0.5rem 0;\n  outline: none !important;\n  transition: opacity .2s;\n}\n\n.slider:hover {\n  opacity: 1;\n}\n\n.slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 1.3rem;\n  height: 1.3rem;\n  background: var(--vt-c-brand);\n  cursor: pointer;\n  border-radius: 50%;\n}\n",
    "path": "packages/core/useTimeAgo/demo.vue"
  }
]
