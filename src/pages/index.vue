<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import DefaultProject from '../../presets/default'
import { useProjectStore } from '~/modules/project'
import { useAppStore } from '~/modules/app'

const app = useAppStore()

useEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's' && app.preventCtrlS)
    e.preventDefault()
})

const project = useProjectStore()
project.importProject(DefaultProject)
</script>

<template>
  <div
    flex
    flex-row overflow-hidden
  >
    <Navigation h-screen />
    <main
      h-screen
      flex-1
      bg-light-900
      dark:bg-dark-900
      grid
      grid-rows="[min-content_auto_min-content]"
    >
      <Titlebar
        px="!0"
        border="b-1 light-900 dark:dark-900"
      >
        <EditorTabs />
      </Titlebar>
      <div
        h-full
        overflow-hidden
      >
        <Splitpanes
          w-full
          h-full
        >
          <Pane
            bg-light-100
            dark:bg-dark-800
          >
            <Suspense>
              <template #loading>
                Loading...
              </template>
              <template #default>
                <EditorGroup />
              </template>
            </Suspense>
          </Pane>
          <Pane
            bg-light-100
            dark:bg-dark-800
          >
            <Splitpanes horizontal>
              <Pane
                flex
                flex-col size="75"
              >
                <Titlebar
                  flex-shrink-0
                  border-t-0
                  pr-2
                >
                  <i
                    i="carbon-chevron-down"
                    mr-1 text-base
                  />
                  <span flex-1>
                    Preview
                  </span>
                  <PreviewControls />
                </Titlebar>
                <Preview flex-1 />
              </Pane>
              <Pane
                size="25"
                flex flex-col
              >
                <Titlebar flex-shrink-0>
                  <i
                    i="carbon-chevron-down"
                    mr-1 text-base
                  />
                  Terminal
                </Titlebar>
                <div h="[calc(100%-32px)]">
                  <Terminal />
                </div>
              </Pane>
            </Splitpanes>
          </Pane>
        </Splitpanes>
      </div>
      <Statusbar />
    </main>
  </div>
  <Settings />
</template>
