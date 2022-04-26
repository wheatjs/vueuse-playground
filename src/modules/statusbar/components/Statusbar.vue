<script setup lang="ts">
import { StatusbarAlignment, StatusbarItemType, statusbarItems } from '..'

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
    <div
      flex
      flex-1
      flex-row
      h-full
      items-center
      divide="x-1 dark:dark-900 light-900"
    >
      <template
        v-for="item in itemsAlignedLeft"
        :key="item.id"
      >
        <template v-if="!item.isHidden">
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
          <StatusbarButton
            v-else-if="item.type === StatusbarItemType.Button"
            :item="item"
          />
        </template>
      </template>
    </div>

    <!-- Right -->
    <div
      flex
      flex-row
      h-full
      items-center
      border="l-1 dark:dark-900 light-900"
      divide="x-1 dark:dark-900 light-900"
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
        <StatusbarButton
          v-else-if="item.type === StatusbarItemType.Button"
          :item="item"
        />
      </template>
    </div>
  </Titlebar>
</template>
