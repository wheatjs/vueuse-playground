<script setup lang="ts">
import { ref, watch } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import { orchestrator, onShouldUpdateContent } from '~/orchestrator'
import ScreenSizeSimulator from '../ui/ScreenSizeSimulator.vue'

const initialScript = ref('')
const initialTemplate = ref('')

onShouldUpdateContent(() => {
  if (orchestrator.activeFile) {
    initialScript.value = orchestrator.activeFile?.script
    initialTemplate.value = orchestrator.activeFile?.template
  }
})

const onContentChanged = (source: string, content: string) => {
  if (orchestrator.activeFile) {
    if (source === 'script')
      orchestrator.activeFile.script = content
    else if (source === 'template')
      orchestrator.activeFile.template = content
  }
}
</script>

<template>
  <Splitpanes class="default-theme">
    <Pane>
      <div class="h-full flex flex-col">
        <TabBar />
        <Splitpanes class="default-theme editors-height" horizontal>
          <Pane>
            <Container title="Script Setup" class="rounded-b-md" no-overflow no-rounding>
              <template #controls></template>
              <template #default>
                <Editor
                  language="javascript"
                  :value="initialScript"
                  @change="content => onContentChanged('script', content)"
                />
              </template>
            </Container>
          </Pane>
          <Pane>
            <Container title="Template" class="border-1 border-white" no-overflow>
              <template #controls></template>
              <template #default>
                <Editor
                  language="html"
                  :value="initialTemplate"
                  @change="content => onContentChanged('template', content)"
                />
              </template>
            </Container>
          </Pane>
        </Splitpanes>
      </div>
    </Pane>
    <Pane>
      <Splitpanes @resize="" horizontal class="default-theme">
        <Pane>
          <Container title="Output">
            <template #controls>
              <!-- <button p="x-2" h="8" border="l-1 dark-300">
                <carbon-camera m="t-1" />
              </button>
              <ScreenSizeSimulator /> -->
            </template>
            <template #default>
              <Preview />
            </template>
          </Container>
        </Pane>
        <Pane size="25">
          <Container title="Console">
            <Console />
          </Container>
        </Pane>
      </Splitpanes>
    </Pane>
  </Splitpanes>
</template>

<style>
.editors-height {
  height: calc(100% - 2rem);
}

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
