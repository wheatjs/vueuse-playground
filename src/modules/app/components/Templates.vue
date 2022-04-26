<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import type { ProjectSolution } from '~/modules/project'

const props = defineProps<{
  presets: ProjectSolution[]
  modelValue: string
}>()

const value = useVModel(props)
</script>

<template>
  <RadioGroup v-model="value">
    <div space-y-2>
      <RadioGroupOption
        v-for="p in presets"
        :key="p.name"
        v-slot="{ checked }"
        :value="p.name"
      >
        <Item
          cursor-pointer
          :selected="checked"
          bg="dark:dark-500"
          px-4
          py-2
        >
          <span capitalize>
            {{ p.name }}
          </span>
          <template #subtitle>
            {{ p.description }}
          </template>
          <template #overflow>
            <div
              v-if="checked"
              w-8 h-8 bg-green-600
              rounded-full
              flex place-items-center place-content-center
              text-green-900
            >
              <div
                i-carbon-checkmark
                w-5 h-5
              />
            </div>
          </template>
        </Item>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
