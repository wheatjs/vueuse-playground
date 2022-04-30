export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { computed } from 'vue'\nimport { useMagicKeys } from '@vueuse/core'\nimport Key from './Key.vue'\n\nconst { shift, v, u, e, s, v_u_e, u_s_e, current } = useMagicKeys()\nconst keys = computed(() => Array.from(current))\n",
    "templateContent": "\n  <div class=\"flex flex-col md:flex-row\">\n    <img\n      src=\"/vue.svg\"\n      class=\"h-38 py-8 m-auto transform transistion duration-500\"\n      :class=\"{'opacity-0': !v_u_e, 'rotate-180': shift }\"\n    >\n\n    <div>\n      <note class=\"text-center mt-0 mb-5\">\n        Press the following keys to test out\n      </note>\n      <div class=\"flex gap-3 justify-center\">\n        <Key :value=\"v\">\n          V\n        </Key>\n        <Key :value=\"u\">\n          u\n        </Key>\n        <Key :value=\"e\">\n          e\n        </Key>\n        <div class=\"mx-1\" />\n        <Key :value=\"u\">\n          U\n        </Key>\n        <Key :value=\"s\">\n          s\n        </Key>\n        <Key :value=\"e\">\n          e\n        </Key>\n      </div>\n\n      <div class=\"flex gap-3 justify-center mt-3\">\n        <Key :value=\"shift\">\n          Shift\n        </Key>\n        <Key :value=\"v_u_e\">\n          Vue\n        </Key>\n        <Key :value=\"u_s_e\">\n          Use\n        </Key>\n      </div>\n\n      <div class=\"text-center mt-4\">\n        <Note>Keys Pressed</Note>\n        <div class=\"flex mt-2 justify-center space-x-1 min-h-1.5em\">\n          <code\n            v-for=\"key in keys\"\n            :key=\"key\"\n            class=\"font-mono\"\n          >\n            {{ key }}\n          </code>\n        </div>\n      </div>\n    </div>\n\n    <img\n      src=\"/favicon.svg\"\n      class=\"h-38 py-8 m-auto transform transistion duration-500\"\n      :class=\"{'opacity-0': !u_s_e, 'rotate-180': shift }\"\n    >\n  </div>\n",
    "path": "packages/core/useMagicKeys/demo.vue"
  },
  {
    "name": "Key.vue",
    "scriptContent": "\ndefineProps<{\n  value: boolean\n}>()\n",
    "templateContent": "\n  <div\n    class=\"font-mono px-4 py-2 rounded \"\n    :class=\"value\n      ? 'opacity-100 text-primary bg-primary bg-opacity-15'\n      : 'opacity-50 bg-gray-600 bg-opacity-10 dark:(bg-gray-400 bg-opacity-10)'\n    \"\n  >\n    <slot />\n  </div>\n",
    "path": "packages/core/useMagicKeys/Key.vue"
  }
]
