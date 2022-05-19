<script setup lang="ts">
import { useCodeMirror } from './useCodeMirror'
import type { BaseFile, Document } from '~/modules/project'

const props = defineProps<{
  file: BaseFile
  document: Document
}>()

const target = ref<HTMLElement>()
useCodeMirror(target, {
  document: props.document,
})
</script>

<template>
  <div ref="target" h-full overflow-auto />
</template>

<style>
.cm-editor {
  @apply h-full text-base;
  font-family: 14px;
}

/* .cm-content {
  @apply !p-0;
} */

:root {
  --cm-font-family: 'JetBrains Mono', Consolas, 'Courier New', monospace;
  --cm-font-size: 14px;
  --cm-foreground: #393a3480;
  --cm-background: #fdfdfd;
  --cm-comment: #a0ada0;
  --cm-string: #b56959;
  --cm-literal: #2f8a89;
  --cm-number: #296aa3;
  --cm-keyword: #1c6b48;
  --cm-function: #6c7834;
  --cm-boolean: #1c6b48;
  --cm-constant: #a65e2b;
  --cm-deleted: #a14f55;
  --cm-class: #2993a3;
  --cm-builtin: #ab5959;
  --cm-property: #b58451;
  --cm-namespace: #b05a78;
  --cm-punctuation: #8e8f8b;
  --cm-decorator: #bd8f8f;
  --cm-regex: #ab5e3f;
  --cm-json-property: #698c96;
  /* scrollbars colors */
  --cm-ttc-c-thumb: #eee;
  --cm-ttc-c-track: white;
}
html.dark {
  --cm-scheme: dark;
  --cm-foreground: white;
  --cm-background: #111;
  --cm-comment: #758575;
  --cm-string: #d48372;
  --cm-literal: #429988;
  --cm-keyword: #4d9375;
  --cm-boolean: #1c6b48;
  --cm-number: #6394bf;
  --cm-variable: #bf9763;
  --cm-function: #bf9763;
  --cm-deleted: #a14f55;
  --cm-class: #54b1bf;
  --cm-builtin: #e0a569;
  --cm-property: #bf9763;
  --cm-namespace: #db889a;
  --cm-punctuation: #858585;
  --cm-decorator: #bd8f8f;
  --cm-regex: #ab5e3f;
  --cm-json-property: #6b8b9e;
  --cm-line-number: #dedcd530;
  --cm-line-number-gutter: #eeeeee;
  --cm-line-highlight-background: #181818;
  --cm-selection-background: #44444450;
  /* scrollbars colors */
  --cm-ttc-c-thumb: #222;
  --cm-ttc-c-track: #111;
}
</style>
