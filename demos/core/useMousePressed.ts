export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { stringify } from '@vueuse/docs-utils'\nimport { useToggle } from '@vueuse/shared'\nimport { computed, reactive, ref } from 'vue'\nimport { useMousePressed } from '@vueuse/core'\n\nconst el = ref<Element | null>()\nconst [withTarget, toggle] = useToggle()\nconst target = computed<Element | null>(() => {\n  if (withTarget.value)\n    return el.value\n  return window as any as Element\n})\n\nconst mouse = reactive(useMousePressed({ target }))\nconst text = stringify(mouse)\n",
    "templateContent": "\n  <div ref=\"el\" class=\"select-none\">\n    <pre lang=\"yaml\">{{ text }}</pre>\n    <div>\n      Tracking on\n      <button class=\"ml-2 button small\" @click=\"toggle\">\n        {{ withTarget ? 'Demo section' : 'Entire page' }}\n      </button>\n    </div>\n    <!-- <div\n      class=\"h-40 w-40 bg-green-200 text-green-900 p-3 flex flex-row items-center text-center\"\n      @drop.prevent=\"() => {}\"\n    >\n      Drop something here to try drag and drop.\n    </div> -->\n  </div>\n",
    "path": "packages/core/useMousePressed/demo.vue"
  }
]
