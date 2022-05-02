export default [
  {
    "filename": "demo.vue",
    "script": "import { useCycleList } from '@vueuse/core'\n\nconst list = [\n  'Dog',\n  'Cat',\n  'Lizard',\n  'Shark',\n  'Whale',\n  'Dolphin',\n  'Octopus',\n  'Seal',\n]\n\nconst { state, next, prev } = useCycleList(list)",
    "template": "<div>\n    <div class=\"text-primary text-lg font-bold\">\n      {{ state }}\n    </div>\n    <button @click=\"prev()\">\n      Prev\n    </button>\n    <button @click=\"next()\">\n      Next\n    </button>\n  </div>"
  }
]
