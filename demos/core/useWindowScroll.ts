export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { useWindowScroll } from '@vueuse/core'\n\nconst { x, y } = useWindowScroll()\n",
    "templateContent": "\n  <div>\n    <div>\n      See scroll values in the lower right corner of the screen.\n    </div>\n    <div class=\"scroller\" />\n    <div class=\"float\">\n      <note class=\"mb-2\">\n        Scroll value\n      </note>\n      x: {{ x }}<br>\n      y: {{ y }}\n    </div>\n  </div>\n",
    "styleContent": "\n.scroller {\n  position: absolute;\n  top: 100%;\n  left: 100%;\n  width: 10000px;\n  height: 10000px;\n}\n",
    "path": "packages/core/useWindowScroll/demo.vue"
  }
]
