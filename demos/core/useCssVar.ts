export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { ref } from 'vue'\nimport { useCssVar } from '@vueuse/core'\n\nconst el = ref(null)\nconst color = useCssVar('--color', el)\n\nconst switchColor = () => {\n  if (color.value === '#df8543')\n    color.value = '#7fa998'\n  else\n    color.value = '#df8543'\n}\n\nconst elv = ref(null)\nconst key = ref('--color')\nconst colorVal = useCssVar(key, elv)\nconst changeVar = () => {\n  if (key.value === '--color')\n    key.value = '--color-one'\n  else\n    key.value = '--color'\n}\n",
    "templateContent": "\n  <div ref=\"el\" style=\"--color: #7fa998; color: var(--color)\">\n    Sample text, {{ color }}\n  </div>\n  <button @click=\"switchColor\">\n    Change Color\n  </button>\n  <div ref=\"elv\" style=\"--color: #7fa998; --color-one: #df8543;\" :style=\"{color: colorVal}\">\n    Sample text, {{ key }}: {{ colorVal }}\n  </div>\n  <button style=\"margin-left: 0;\" @click=\"changeVar\">\n    Change Color Variable\n  </button>\n",
    "path": "packages/core/useCssVar/demo.vue"
  }
]
