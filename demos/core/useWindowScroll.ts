export default [
  {
    "filename": "demo.vue",
    "script": "import { useWindowScroll } from '@vueuse/core'\n\nconst { x, y } = useWindowScroll()",
    "template": "<div>\n    <div>\n      See scroll values in the lower right corner of the screen.\n    </div>\n    <div class=\"scroller\" />\n    <div class=\"float\">\n      <note class=\"mb-2\">\n        Scroll value\n      </note>\n      x: {{ x }}<br>\n      y: {{ y }}\n    </div>\n  </div>",
    "style": ".scroller {\n  position: absolute;\n  top: 100%;\n  left: 100%;\n  width: 10000px;\n  height: 10000px;\n}"
  }
]
