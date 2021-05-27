<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import { store } from './store'

const initialScriptContent = `
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
`.trim()

const initialTemplateContent = `
X: {{ x }}
Y: {{ y }}
`.trim()

let scriptContent = initialScriptContent
let templateContent = ''

const onContentChanged = (source: string, content: string) => {
  if (source === 'script')
    store.scriptContent = content
  else if (source === 'template')
    store.templateContent = content
}
</script>

<template>
  <div class="h-screen bg-dark-900 p-4 text-light-100">
    <Splitpanes class="default-theme">
      <Pane>
        <Splitpanes class="h-full default-theme" horizontal>
          <Pane>
            <Container title="Script Setup">
              <Editor @change="(content) => onContentChanged('script', content)" language="typescript" :value="initialScriptContent" />
            </Container>
          </Pane>
          <Pane>
            <Container title="Template">
              <Editor @change="(content) => onContentChanged('template', content)" language="html" :value="initialTemplateContent" />
            </Container>
          </Pane>
        </Splitpanes>
      </Pane>
      <Pane>
        <Container title="Output">
          <Preview />
          {{store}}
        </Container>
      </Pane>
    </Splitpanes>
    </div>
</template>

<style>
.splitpanes.default-theme .splitpanes__pane {
  @apply bg-transparent;
}
.splitpanes.default-theme .splitpanes__splitter {
  @apply bg-transparent border-transparent min-w-4 min-h-4;
}

.splitpanes.default-theme .splitpanes__splitter::before,
.splitpanes.default-theme .splitpanes__splitter::after {
  @apply bg-dark-100;
}

.splitpanes.default-theme .splitpanes__splitter:hover::before,
.splitpanes.default-theme .splitpanes__splitter:hover::after {
  @apply bg-dark-100;
}
</style>