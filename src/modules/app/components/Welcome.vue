<script setup lang="ts">
import { useAppStore } from '../store'
import { useFirebaseStore } from '~/modules/firebase'
import { useProjectStore } from '~/modules/project'

const app = useAppStore()
const firebase = useFirebaseStore()
const project = useProjectStore()

interface StartAction {
  title: string
  subtitle: string
  icon: string
  onClick: () => void
}

const startActions: StartAction[] = [
  {
    title: 'New Project',
    subtitle: 'Create a new project from a template',
    icon: 'i-carbon-intent-request-create',
    onClick() {
      app.welcomeOpen = false
      project.isNewProjectDialogOpen = true
    },
  },
  {
    title: 'Open Existing Project',
    subtitle: 'Open an existing playground project',
    icon: 'i-carbon-folders',
    onClick() {

    },
  },
  {
    title: 'Import Project',
    subtitle: 'Import a project from a file',
    icon: 'i-carbon-workspace-import',
    onClick() {

    },
  },
  {
    title: 'Open Demo',
    subtitle: 'Open an offical VueUse Demo',
    icon: 'i-mdi-application-brackets-outline',
    onClick() {
      app.welcomeOpen = false
      project.isOpenDemoDialogOpen = true
    },
  },
]
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
        v-for="item in startActions"
        :key="item.title"
        cursor-pointer
        tabindex="0"
        ring="focus:(3 green-500)"
        outline="focus:none"
        bg="dark:dark-800  light-500"
        border="dark:dark-900 1 light-900"
        min-h-20
        pr-4
        @click="item.onClick()"
      >
        <template #icon>
          <i
            :class="item.icon"
            block
            text-5xl
            op50
          />
        </template>
        <span text-lg>
          {{ item.title }}
        </span>
        <template #subtitle>
          {{ item.subtitle }}
        </template>
      </Item>
    </div>
  </Dialog>
</template>
