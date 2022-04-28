<script setup lang="ts">
import { useAppStore } from '../store'
import { useFirebaseStore } from '~/modules/firebase'

const app = useAppStore()
const firebase = useFirebaseStore()
</script>

<template>
  <Dialog
    v-model="app.welcomeOpen"
    max-w-250
    lg:max-h-125
    h-full
    grid
    lt-lg:place-items-center
    overflow-auto
    lg:grid-cols-2 lg:divide="x-1 dark:dark-900 light-900"
    font-sans
  >
    <div
      w-full
      max-w-100
      mx-auto
      p-8
      flex flex-col place-items-center place-content-center
      space-y-4
    >
      <LogoHorizontal
        max-w-100
      />
      <Checkbox v-model="app.showWelcome">
        Show Welcome on Startup
      </Checkbox>
      <Item
        v-if="firebase.isAuthenticated"
        bg="dark:dark-800 light-500"
        pr-4
        h-16
        border="1 dark:dark-900 light-900"
      >
        <template #icon>
          <img
            :src="firebase.user?.photoURL"
            w-12 h-12
            rounded-full
          >
        </template>
        Welcome back {{ firebase.user?.displayName }}!
        <template #subtitle>
          <span
            text-sm
            text-green-600
            underline
          >Manage Account</span>
        </template>
      </Item>
      <div
        flex
        flex-row
        space-x-2
      >
        <Button @click="app.welcomeOpen = false">
          Close
        </Button>
        <Button
          v-if="!firebase.isAuthenticated"
          flex
          flex-row
          text="!white"
          bg="!black"
          @click="firebase.signIn()"
        >
          <i
            i-carbon-logo-github
            text-lg
          />
          <span>Sign In</span>
        </Button>
        <Button
          v-else
          flex
          flex-row
          bg="!black"
          text="!white"
          @click="firebase.signOut()"
        >
          <i
            i-carbon-exit
            text-lg
          />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
    <div
      py-4
      px-8
      space-y-2
      flex flex-col place-content-center
    >
      <div
        text-xl
        op75
        mb-2
      >
        Get Started
      </div>
      <Item
        bg="dark:dark-800  light-500"
        border="dark:dark-900 1 light-900"
        min-h-20
        pr-4
      >
        <template #icon>
          <i
            i-carbon-intent-request-create
            block
            text-5xl
            op50
          />
        </template>
        <span text-lg>
          New Project
        </span>
        <template #subtitle>
          Create a new project from a template
        </template>
      </Item>
      <Item
        bg="dark:dark-800  light-500"
        border="dark:dark-900 1 light-900"
        min-h-20
        pr-4
      >
        <template #icon>
          <i
            i-carbon-folders
            block
            text-5xl
            op50
          />
        </template>
        <span text-lg>
          Open Existing Project
        </span>
        <template #subtitle>
          <p leading-4>
            Open an existing playground project
          </p>
        </template>
      </Item>
      <Item
        bg="dark:dark-800  light-500"
        border="dark:dark-900 1 light-900"
        min-h-20
        pr-4
      >
        <template #icon>
          <i
            i-carbon-workspace-import
            block
            text-5xl
            op50
          />
        </template>
        <span text-lg>
          Import Project
        </span>
        <template #subtitle>
          Import an existing playground project
        </template>
      </Item>
    </div>

    <!-- <div
      w-full
      font-sans
      h-full grid grid-cols-5
    >
      <div
        col-span-2
        h-full
        grid place-content-center place-items-center
        border="r-1 dark:dark-900 light-900"
      >
        <Logo w-50 />
        <div
          mb-5
          mt="-2"
          text="center dark:light-900/90 dark-50"
          flex flex-col
        >
          <span text-5xl>VueUse</span>
          <span
            text-2xl
            mt="-1"
          >Playground</span>
        </div>
        <Checkbox v-model="app.showWelcome">
          Show Welcome on Startup
        </Checkbox>

        <div
          flex
          flex-row
          mt-5
          space-x-2
        >
          <Button>
            Sign In
          </Button>
          <Button @click="app.welcomeOpen = false">
            Close
          </Button>
        </div>
      </div>
      <div
        col-span-3
        flex flex-col
        pb-4
      >
        <div
          p-4
          flex-1
        >
          <div
            dark:bg-dark-800
            bg-light-600
            border-1
            dark:border-dark-900
            border-light-900
            rounded
            p-4
            py-2
            h-full
          >
            <div
              mb-2
              op50 text-sm font-sans
            >
              Templates
            </div>
            <Templates
              v-model="preset"
              :presets="presets"
            />
          </div>
        </div>
        <div
          px-4
          flex flex-row
        >
          <span flex-1 />
          <Button @click="loadPreset">
            Create
          </Button>
        </div>
      </div>
    </div> -->
  </Dialog>
</template>
