export default [
  {
    "filename": "demo.vue",
    "script": "import { useUrlSearchParams } from '@vueuse/core'\n\nconst params = useUrlSearchParams('history')\nparams.foo = 'bar'\nparams.vueuse = 'awesome'",
    "template": "<div>\n    <ul class=\"!m-0\">\n      <li v-for=\"key in Object.keys(params)\" :key=\"key\">\n        {{ key }}={{ params[key] }}\n      </li>\n    </ul>\n  </div>"
  }
]
