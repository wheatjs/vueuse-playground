export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useUrlSearchParams } from '@vueuse/core'\n\nconst params = useUrlSearchParams('history')\nparams.foo = 'bar'\nparams.vueuse = 'awesome'\n",
    "templateContent": "\n  <div>\n    <ul class=\"!m-0\">\n      <li v-for=\"key in Object.keys(params)\" :key=\"key\">\n        {{ key }}={{ params[key] }}\n      </li>\n    </ul>\n  </div>\n",
    "path": "packages/core/useUrlSearchParams/demo.vue"
  }
]
