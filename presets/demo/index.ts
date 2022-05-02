import { definePreset } from '../types'
import mainScript from './templates/main.ts?raw'
import mainStyles from './templates/styles.css?raw'

export default definePreset({
  name: 'Demo',
  files: [
    {
      filename: 'main.ts',
      hide: true,
      isProtected: true,
      script: mainScript,
    },
    {
      filename: 'main.css',
      hide: true,
      isProtected: true,
      style: mainStyles,
    },
  ],
  extraFiles: [
    {
      filename: 'BooleanDisplay.vue',
      template: '<span :class="props.value ? props.trueClass : props.falseClass">\n  {{ props.value ? props.true : props.false }}\n</span>',
      script: 'import { ref } from \'vue\'\nconst props = defineProps({\n  value: {\n    default: false,\n  },\n  true: {\n    default: \'true\',\n  },\n  false: {\n    default: \'false\',\n  },\n  trueClass: {\n    default: \'text-primary\',\n  },\n  falseClass: {\n    default: \'text-orange-400 dark:text-orange-300\',\n  },\n})',
    },
    {
      filename: 'Note.vue',
      template: ' <div class="note">\n  <slot />\n</div>\n',
    },
    {
      filename: 'utils.ts',
      script: 'import { reactify } from \'@vueuse/shared\'\nimport YAML from \'js-yaml\'\n\nexport const stringify = reactify(\n  (input: any) => YAML.dump(input, {\n    skipInvalid: true,\n    forceQuotes: true,\n    condenseFlow: true,\n    quotingType: \'\',\n  }),\n)\n',
    },
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
    'js-yaml': 'latest',
  },
})
