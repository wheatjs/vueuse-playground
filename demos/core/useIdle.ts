export default [
  {
    "filename": "demo.vue",
    "script": "import { computed } from 'vue'\nimport { useIdle, useTimestamp } from '@vueuse/core'\n\nconst { idle, lastActive } = useIdle(5000)\n\nconst now = useTimestamp()\n\nconst idledFor = computed(() =>\n  Math.floor((now.value - lastActive.value) / 1000),\n)",
    "template": "<note class=\"mb-2\">\n    For demonstraction purpose, the idle timeout is set to <b>5s</b> in this\n    demo (default 1min).\n  </note>\n  <div class=\"mb-2\">\n    Idle: <BooleanDisplay :value=\"idle\" />\n  </div>\n  <div>Inactive: <b class=\"text-primary\">{{ idledFor }}s</b></div>"
  }
]
