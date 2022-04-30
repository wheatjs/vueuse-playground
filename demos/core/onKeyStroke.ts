export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { onKeyStroke } from '@vueuse/core'\n\nconst translateX = ref(0)\nconst translateY = ref(0)\n\nonKeyStroke(['w', 'W', 'ArrowUp'], (e: KeyboardEvent) => {\n  translateY.value -= 10\n  e.preventDefault()\n})\n\nonKeyStroke(['s', 'S', 'ArrowDown'], (e: KeyboardEvent) => {\n  translateY.value += 10\n  e.preventDefault()\n})\n\nonKeyStroke(['a', 'A', 'ArrowLeft'], (e: KeyboardEvent) => {\n  translateX.value -= 10\n  e.preventDefault()\n})\n\nonKeyStroke(['d', 'D', 'ArrowRight'], (e: KeyboardEvent) => {\n  translateX.value += 10\n  e.preventDefault()\n})\n",
    "templateContent": "\n  <div>\n    <div class=\"container border-base\">\n      <div class=\"ball\" :style=\"{transform: `translate(${translateX}px, ${translateY}px)`}\" />\n    </div>\n    <div class=\"text-center mt-4\">\n      Use the arrow keys or w a s d keys to control the movement of the ball.\n    </div>\n  </div>\n",
    "styleContent": "\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  max-width: 400px;\n  height: 100px;\n  margin: auto;\n  overflow: hidden;\n  border: 1px solid #a1a1a130;\n  border-radius: 5px;\n}\n\n.ball {\n  width: 16px;\n  height: 16px;\n  background: #a1a1a1;\n  border-radius: 50%;\n}\n",
    "path": "packages/core/onKeyStroke/demo.vue"
  }
]
