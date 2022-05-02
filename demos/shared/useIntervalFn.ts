export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useIntervalFn } from '@vueuse/core'\n\nconst greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好']\nconst word = ref('Hello')\nconst interval = ref(500)\n\nconst { pause, resume, isActive } = useIntervalFn(() => {\n  word.value = greetings[Math.round(Math.random() * (greetings.length - 1))]\n}, interval)",
    "template": "<p>{{ word }}</p>\n  <p>\n    interval:\n    <input v-model=\"interval\" type=\"number\" placeholder=\"interval\">\n  </p>\n  <button v-if=\"isActive\" class=\"orange\" @click=\"pause\">\n    Pause\n  </button>\n  <button v-if=\"!isActive\" @click=\"resume\">\n    Resume\n  </button>"
  }
]
