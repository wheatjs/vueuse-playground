<script setup lang="ts">
import { StatusbarAlignment, StatusbarItemType, statusbarItems } from '.'

/**
 * Collect all items that are aligned to the left and sort based on priority
 */
const itemsAlignedLeft = computed(() => {
  return statusbarItems.value
    .filter(item => item.alignment === StatusbarAlignment.Left)
    .sort((a, b) => a.priority - b.priority)
})

/**
 * Collect all items that should be aligned to the right and sort based on priority
 */
const itemsAlignedRight = computed(() => {
  return statusbarItems.value
    .filter(item => item.alignment === StatusbarAlignment.Right)
    .sort((a, b) => a.priority - b.priority)
})
</script>

<template>
  <Titlebar border-b-0>
    <!-- Left -->
    <div flex-1>
      <template
        v-for="item in itemsAlignedLeft"
        :key="item.id"
      >
        Hey - {{ item.type }}
      </template>
    </div>

    <!-- Right -->
    <div
      flex
      flex-row
      h-full
      items-center
    >
      <template
        v-for="item in itemsAlignedRight"
        :key="item.id"
      >
        <StatusbarItemText
          v-if="item.type === StatusbarItemType.Text"
          :item="item"
        />
        <StatusbarItemSelect
          v-else-if="item.type === StatusbarItemType.Select"
          v-model="item.value"
          :item="item"
          h-full
          b-y-0
        />
      </template>
    </div>
  </Titlebar>
</template>
