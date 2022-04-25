<script setup lang="ts">
const props = defineProps<{
  name: string
  description: string
  type: string
  enumValues?: string[]
  enumDescriptions?: string[]
  modelValue: any
}>()

const value = useVModel(props)
</script>

<template>
  <div
    px-4
    py-4
    bg="hover:(light-700 dark:dark-400) focus-within:(dark:dark-400 light-700)"
  >
    <div
      flex
      flex-col
    >
      <span>{{ name }}</span>
      <label text="sm dark:light-900/50">
        <template v-if="type === 'boolean'">
          <input
            v-model="value"
            type="checkbox"
            mr-1
          >
        </template>
        <span select-none>
          {{ description }}
        </span>
      </label>
    </div>
    <div mt-1>
      <template v-if="type === 'string'">
        <div
          v-if="enumValues"
          flex flex-row
          relative
          max-w-100
          w-full
          items-center
        >
          <select
            v-model="value"
            max-w-100
            w-full
            bg="dark:dark-800"
            appearance="none"
            h-8
            text-sm
            outline="focus:none"
            rounded-sm
            border="1 dark-900 focus:green-500"
            px-2
          >
            <option
              v-for="option in enumValues"
              :key="option" :value="option"
            >
              {{ option }}
            </option>
          </select>
          <div
            i-carbon-chevron-down
            absolute
            w-5 h-5 right-2
            pointer-events-none
          />
        </div>
        <template v-else>
          <input
            v-model="value"
            max-w-100
            w-full
            bg="dark:dark-800"
            h-8
            text-sm
            outline="focus:none"
            rounded-sm
            border="1 dark-900 focus:green-500"
            px-2
          >
        </template>
      </template>
      <template v-else-if="type === 'number'">
        <input
          v-model.number="value"
          type="number"
          max-w-100
          w-full
          bg="dark:dark-800"
          h-8
          text-sm
          outline="focus:none"
          rounded-sm
          border="1 dark-900 focus:green-500"
          px-2
        >
      </template>
    </div>
  </div>
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
