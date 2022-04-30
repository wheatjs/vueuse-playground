export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useKeyModifier } from '@vueuse/core'\nimport Key from '../useMagicKeys/Key.vue'\n\nconst capsLock = useKeyModifier('CapsLock')\nconst numLock = useKeyModifier('NumLock')\nconst scrollLock = useKeyModifier('ScrollLock')\nconst shift = useKeyModifier('Shift')\nconst control = useKeyModifier('Control')\nconst alt = useKeyModifier('Alt')\n",
    "templateContent": "\n  <div class=\"grid grid-cols-1 md:grid-cols-3 gap-2\">\n    <Key :value=\"capsLock || false\">\n      capsLock\n    </Key>\n    <Key :value=\"numLock || false\">\n      numLock\n    </Key>\n    <Key :value=\"scrollLock || false\">\n      scrollLock\n    </Key>\n    <Key :value=\"shift || false\">\n      shift\n    </Key>\n    <Key :value=\"control || false\">\n      control\n    </Key>\n    <Key :value=\"alt || false\">\n      alt\n    </Key>\n  </div>\n",
    "path": "packages/core/useKeyModifier/demo.vue"
  }
]
