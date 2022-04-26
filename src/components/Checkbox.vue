<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const value = useVModel(props)
</script>

<template>
  <label>
    <input
      v-model="value"
      outline="focus:none"
      ring="focus:(2 green-500)"
      type="checkbox"
      mr-2
    >
    <span select-none>
      <slot />
    </span>
  </label>
</template>

<style>
.checkbox {
  @apply inline-flex items-center my-auto cursor-pointer select-none;
}
input[type="checkbox"] {
  appearance: none;
  padding: 0;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  height: 1rem;
  width: 1rem;
  @apply dark:bg-dark-800/30 rounded h-4 w-4 select-none border-1 dark:border-dark-900 border-light-900;
}

input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgba(0,0,0,.56)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

.dark input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgba(255,255,255,.72)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}
</style>
