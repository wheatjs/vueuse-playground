<script setup lang="ts">
import { defineProps, provide } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{ modelValue: boolean }>()
const isOpen = useVModel(props)

provide('closeSettings', () => isOpen.value = false);
</script>

<template>
  <!-- Scrim -->
  <div v-if="isOpen">
    <div class="fixed z-500 inset-0 bg-white dark:bg-opacity-35 bg-opacity-75" @click="isOpen = false">
    </div>
    <div class="fixed inset-0 p-4 z-500 grid place-items-center pointer-events-none">
      <div class=" rounded w-full h-[50vh] max-w-screen-lg dark:text-light-100 shadow-xl grid grid-cols-[200px,auto] overflow-hidden pointer-events-auto">
        <SettingsTabs>
          <SettingsTab active name="Installed">
            <InstalledPackages />
          </SettingsTab>
          <SettingsTab name="Packages">
            <SkypackSearch />
          </SettingsTab>
          <SettingsTab name="Editor">
            <div class="h-[50vh] grid place-content-center text-lg place-items-center">
              Coming Soon
            </div>
          </SettingsTab>
        </SettingsTabs>
      </div>
    </div>
  </div>
</template>

<style>
.backdrop-blur-sm {
  backdrop-filter: var(--tw-backdrop-blur);
}
</style>
