export default [
  {
    "filename": "demo.vue",
    "script": "import { useKeyModifier } from '@vueuse/core'\nimport Key from './Key.vue'\n\nconst capsLock = useKeyModifier('CapsLock')\nconst numLock = useKeyModifier('NumLock')\nconst scrollLock = useKeyModifier('ScrollLock')\nconst shift = useKeyModifier('Shift')\nconst control = useKeyModifier('Control')\nconst alt = useKeyModifier('Alt')",
    "template": "<div class=\"grid grid-cols-1 md:grid-cols-3 gap-2\">\n    <Key :value=\"capsLock || false\">\n      capsLock\n    </Key>\n    <Key :value=\"numLock || false\">\n      numLock\n    </Key>\n    <Key :value=\"scrollLock || false\">\n      scrollLock\n    </Key>\n    <Key :value=\"shift || false\">\n      shift\n    </Key>\n    <Key :value=\"control || false\">\n      control\n    </Key>\n    <Key :value=\"alt || false\">\n      alt\n    </Key>\n  </div>"
  },
  {
    "filename": "Key.vue",
    "script": "defineProps<{\n  value: boolean\n}>()",
    "template": "<div\n    class=\"font-mono px-4 py-2 rounded \"\n    :class=\"value\n      ? 'opacity-100 text-primary bg-primary bg-opacity-15'\n      : 'opacity-50 bg-gray-600 bg-opacity-10 dark:(bg-gray-400 bg-opacity-10)'\n    \"\n  >\n    <slot />\n  </div>"
  }
]
