<script setup lang="ts">
const isOpen = ref(true)
</script>

<template>
  <Dialog
    v-model="isOpen"
    prose
  >
    <div px-4>
      Hello World
    </div>

    <div
      flex
      flex-row
      p-4
    >
      <Button
        bg-red-500
        text-red-100
      >
        <div
          i-carbon-delete
          mr-1
        />
        <span>Remove Package</span>
      </Button>
      <span flex-1 />
      <Button bg-dark-800>
        Close
      </Button>
    </div>
  </Dialog>
</template>
