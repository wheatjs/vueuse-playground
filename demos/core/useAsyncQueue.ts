export default [
  {
    "filename": "demo.vue",
    "script": "import { useAsyncQueue } from '@vueuse/core'\n\nconst p1 = () => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve(1000)\n    }, 10)\n  })\n}\n\nconst p2 = (result: number) => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve(1000 + result)\n    }, 20)\n  })\n}\n\nconst { activeIndex, result } = useAsyncQueue([p1, p2])",
    "template": "<div>\n    <note>activeIndex: {{ activeIndex }}</note>\n    <note>result: {{ result }}</note>\n  </div>"
  }
]
