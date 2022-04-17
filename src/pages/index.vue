<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { usePackages } from '~/modules/packages'

const packages = usePackages()
packages.addPackage('@vueuse/core')
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
                >
                  <i
                    i="carbon-chevron-down"
                    mr-1 text-base
                  />
                  Preview
                </Titlebar>
                <Preview flex-1 />
              </Pane>
              <Pane
                size="25"
                flex flex-col
              >
                <Titlebar>
                  <i
                    i="carbon-chevron-down"
                    mr-1 text-base
                  />
                  Terminal
                </Titlebar>
                <Terminal />
              </Pane>
            </Splitpanes>
          </Pane>
        </Splitpanes>
      </div>
      <Statusbar />
    </main>
  </div>
  <ProjectSettings />
</template>
