export default [
  {
    "name": "demo.vue",
    "scriptContent": "\nimport { computed } from 'vue'\nimport { useIdle } from '@vueuse/core'\nimport { useTimestamp } from '../useTimestamp'\n\nconst { idle, lastActive } = useIdle(5000)\n\nconst now = useTimestamp()\n\nconst idledFor = computed(() =>\n  Math.floor((now.value - lastActive.value) / 1000),\n)\n",
    "templateContent": "\n  <note class=\"mb-2\">\n    For demonstraction purpose, the idle timeout is set to <b>5s</b> in this\n    demo (default 1min).\n  </note>\n  <div class=\"mb-2\">\n    Idle: <BooleanDisplay :value=\"idle\" />\n  </div>\n  <div>Inactive: <b class=\"text-primary\">{{ idledFor }}s</b></div>\n",
    "path": "packages/core/useIdle/demo.vue"
  }
]
