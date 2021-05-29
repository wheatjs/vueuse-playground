<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import { store } from '~/store'

const initialScriptContent = store.scriptContent.length > 0
  ? store.scriptContent
  : `
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
`.trim()

const initialTemplateContent = store.templateContent.length > 0
  ? store.templateContent
  : `
X: {{ x }}
Y: {{ y }}
`.trim()

const onContentChanged = (source: string, content: string) => {
  if (source === 'script')
    store.scriptContent = content
  else if (source === 'template')
    store.templateContent = content
}
</script>

<template>
  <Splitpanes class="default-theme">
    <Pane>
      <Splitpanes class="h-full default-theme" horizontal>
        <Pane>
          <Container title="Script Setup">
            <Editor
              language="typescript"
              :value="initialScriptContent"
              @change="(content) => onContentChanged('script', content)"
            />
          </Container>
        </Pane>
        <Pane>
          <Container title="Template">
            <Editor
              language="html"
              :value="initialTemplateContent"
              @change="(content) => onContentChanged('template', content)"
            />
          </Container>
        </Pane>
      </Splitpanes>
    </Pane>
    <Pane>
      <Splitpanes horizontal>
        <Pane>
          <Container title="Output">
            <Preview />
          </Container>
        </Pane>
        <!-- <Pane size="25">
          <Container title="Console">
            <Console />
          </Container>
        </Pane> -->
      </Splitpanes>
    </Pane>
  </Splitpanes>
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
  @apply bg-dark-100 bg-opacity-50;
}

.splitpanes.default-theme .splitpanes__splitter:hover::before,
.splitpanes.default-theme .splitpanes__splitter:hover::after {
  @apply bg-light-100 bg-opacity-50;
}

.dark .splitpanes.default-theme .splitpanes__splitter::before,
.dark .splitpanes.default-theme .splitpanes__splitter::after {
  @apply bg-dark-100;
}

.dark .splitpanes.default-theme .splitpanes__splitter:hover::before,
.dark .splitpanes.default-theme .splitpanes__splitter:hover::after {
  @apply bg-dark-100;
}
</style>
