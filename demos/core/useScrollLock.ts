export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useToggle } from '@vueuse/shared'\nimport { useScrollLock } from '@vueuse/core'\nimport { useScroll } from '../useScroll'\n\nconst el = ref<HTMLElement | null>(null)\nuseScroll(el)\nconst isLocked = useScrollLock(el)\nconst toggleLock = useToggle(isLocked)\n",
    "templateContent": "\n  <div class=\"flex flex-wrap\">\n    <div ref=\"el\" class=\"w-300px h-300px m-auto overflow-scroll bg-gray-500/5 rounded\">\n      <div class=\"w-500px h-400px relative\">\n        <div position=\"absolute left-0 top-0\" bg=\"gray-500/5\" p=\"x-2 y-1\">\n          TopLeft\n        </div>\n        <div position=\"absolute left-0 bottom-0\" bg=\"gray-500/5\" p=\"x-2 y-1\">\n          BottomLeft\n        </div>\n        <div position=\"absolute right-0 top-0\" bg=\"gray-500/5\" p=\"x-2 y-1\">\n          TopRight\n        </div>\n        <div position=\"absolute right-0 bottom-0\" bg=\"gray-500/5\" p=\"x-2 y-1\">\n          BottomRight\n        </div>\n        <div position=\"absolute left-1/3 top-1/3\" bg=\"gray-500/5\" p=\"x-2 y-1\">\n          Scroll Me\n        </div>\n      </div>\n    </div>\n    <div class=\"m-auto px-6 py-4 rounded flex flex-col w-60 gap-2 bg-gray-500/5\">\n      <div>\n        <span opacity=\"75\">\n          isLocked\n        </span>\n        <BooleanDisplay :value=\"isLocked\" />\n      </div>\n      <button opacity=\"75\" @click=\"toggleLock()\">\n        {{ isLocked ? 'Unlock' : 'Lock' }}\n      </button>\n    </div>\n  </div>\n",
    "path": "packages/core/useScrollLock/demo.vue"
  }
]
