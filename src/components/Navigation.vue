<script setup lang="ts">
import { useAppStore } from '~/modules/app'
import { useFirebaseStore } from '~/modules/firebase'

const app = useAppStore()
const firebase = useFirebaseStore()
const isOverflowMenuOpen = ref(false)

interface MenuItem {
  label: string
  icon: string
  href?: string
  to?: string
  overflow?: boolean
  onClick?: () => void
}

interface Menu {
  start: MenuItem[]
  end: MenuItem[]
}

const menu: Menu = {
  start: [
    {
      label: 'Documentation',
      icon: 'i-carbon-notebook',
      href: 'https://vueuse.org/',
      overflow: true,
    },
    {
      label: 'Recipes',
      icon: 'i-mdi-pot-mix-outline',
      href: 'https://play.vueuse.org/recipes',
      overflow: true,
    },
    {
      label: 'Share',
      icon: 'i-carbon-share',
      overflow: true,
      onClick() {},
    },
    {
      label: 'Report Bug',
      icon: 'i-carbon-debug',
      href: 'https://github.com/wheatjs/vueuse-playground/issues/new',
      overflow: true,
    },
    {
      label: 'GitHub',
      icon: 'i-carbon-logo-github',
      href: 'https://github.com/wheatjs/vueuse-playground',
      overflow: true,
    },
  ],
  end: [
    {
      label: 'Change Theme',
      icon: 'i-carbon-sun dark:i-carbon-moon',
      onClick() {
        app.isDark = !app.isDark
      },
    },
    {
      label: 'Settings',
      icon: 'i-carbon-settings',
      overflow: true,
      onClick() {
        app.settingsOpen = true
      },
    },
  ],
}

const overflow: MenuItem[] = [...menu.start, ...menu.end].filter(m => m.overflow)
</script>

<template>
  <nav
    z-9001
    flex
    flex-col items-center w-16
    bg="dark:dark-700 light-100"
    lt-lg="fixed top-0 left-0 right-0 h-10 w-full flex flex-row items-center px-1 border-b-1 dark:border-dark-900 border-light-900"
    w="w-full lg:w-16"
    lg="gap-1"
    py-2 border="r-1 light-900 dark:dark-900"
  >
    <Logo
      lt-lg="w-7 mr-4"
      lg="w-10 mb-2"
    />

    <IconButton
      v-for="item in menu.start"
      :key="item.label"
      lt-lg="hidden"
      :title="item.label"
      :href="item.href"
      :to="item.to"
      @click="() => item.onClick ? item.onClick() : null"
    >
      <i :class="item.icon" />
    </IconButton>

    <div
      flex-1
      flex flex-row place-content-center
      text-sm
    >
      <Button
        lg="hidden"
        :class="{
          '!bg-green-500 font-bold text-green-900': app.mobileViewPreference === 'code',
          '!bg-transparent': app.mobileViewPreference !== 'code',
        }"
        @click="app.mobileViewPreference = 'code'"
      >
        <i
          text-lg
          i-carbon-code
        />
        <span>Code</span>
      </Button>
      <Button
        lg="hidden"
        :class="{
          '!bg-green-500 font-bold text-green-900': app.mobileViewPreference === 'preview',
          '!bg-transparent': app.mobileViewPreference !== 'preview',
        }"
        @click="app.mobileViewPreference = 'preview'"
      >
        <i
          text-lg
          i-carbon-view
        />
        <span>Preview</span>
      </Button>
    </div>

    <IconButton
      rounded-full
      @click="app.welcomeOpen = true"
    >
      <img
        :src="firebase.user?.photoURL"
        rounded-full
        w="7"
      >
    </IconButton>
    <IconButton
      v-for="item in menu.end"
      :key="item.label"
      lt-lg="hidden"
      :title="item.label"
      :href="item.href"
      :to="item.to"
      @click="() => item.onClick ? item.onClick() : null"
    >
      <i :class="item.icon" />
    </IconButton>
    <IconButton
      lg="hidden"
      @click="isOverflowMenuOpen = !isOverflowMenuOpen"
    >
      <i :i="isOverflowMenuOpen ? 'carbon-close' : 'gg-menu-right'" />
    </IconButton>
  </nav>

  <!-- Overflow Menu -->
  <div
    fixed
    w-full top-10 bottom-0
    bg="dark:dark-700 light-100"
    overflow-auto
    z-9000
    grid
    place-items-center
    content-center
    px-4
    lg="hidden"
    translate-y="-10%"
    transition-all
    :class="{
      'opacity-0 pointer-events-none': !isOverflowMenuOpen,
      'opacity-100 !translate-y-0': isOverflowMenuOpen,
    }"
  >
    <div
      w-full
      max-w-100
      divide="y-1 light-900 dark:dark-300"
    >
      <Button
        v-for="item in overflow"
        :key="item.label"
        w-full
        justify="!start"
        h="!12"
        bg="!transparent"
        rounded="none"
        px-0
      >
        <i
          :class="item.icon"
          mr-2
        />
        <span>
          {{ item.label }}
        </span>
      </Button>
    </div>

    <Item
      w-full
      max-w-100
      px-4
      bg="light-800 dark:dark-400"
      h-12
      mt-4
    >
      Appearance
      <template #overflow>
        <Button
          text-xl
          px-0
          @click="app.isDark = !app.isDark"
        >
          <i
            i-carbon-sun
            dark:i-carbon-moon
          />
        </Button>
      </template>
    </Item>
  </div>
</template>
