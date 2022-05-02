export default [
  {
    "filename": "demo.vue",
    "script": "import { ref } from 'vue'\nimport { useEventBus } from '@vueuse/core'\n\nconst { on, emit } = useEventBus<string>('vue-use-event-bus')\nconst message = ref('')\nconst news = [\n  'Su Bingtian broke the Asian record and entered the Olympic 100-meter race finals as the first person in China-RTHK',\n  'Comprehensive investigation in Zhengzhou to avoid further spread of the epidemic-RTHK',\n  '130 stroke experts after vaccination: nothing to do with the vaccine',\n  'China adds two gold medals in Olympic diving and weightlifting',\n  'Tokyo Olympic service provokes athletes sleeping in cardboard suitcases and eating canned food, reviewing the Beijing Olympics god-level arrangements',\n]\non(_message => message.value = news[Math.floor(Math.random() * news.length)])",
    "template": "<div style=\"display: flex; gap: 100px;\">\n    <div>\n      <div class=\"whitespace-nowrap\">\n        News channel:\n      </div>\n      <button class=\"whitespace-nowrap\" @click=\"emit('The Tokyo Olympics has begun')\">\n        Broadcast\n      </button>\n    </div>\n    <div>\n      <div style=\"margin-bottom: 13px;\">\n        Television:\n      </div>\n      <div>{{ message || '--- no signal ---' }}</div>\n    </div>\n  </div>"
  }
]
