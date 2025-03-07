<script setup lang="ts">
import type { Item } from '@/types'
import { onMounted, ref } from 'vue'
import wait from 'wait'
import Tree from './Tree.vue'

let isLoading = ref(true)

onMounted(async () => {
  await wait(2000)
  isLoading.value = false
})

const items: Item[] = [
  {
    id: 1,
    name: 'Home',
    isDir: true,
    items: [
      {
        id: 6,
        name: 'User',
        isDir: true,
        isOpen: true,
        items: [
          {
            id: 7,
            name: 'index.html',
            isDir: false,
          },
        ],
      },
      {
        id: 4,
        name: 'index.html',
        isDir: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Documents',
    isDir: true,
    items: [
      {
        id: 5,
        name: 'Monthly Report - January 2023.pdf',
        isDir: false,
      },
    ],
  },
  {
    id: 3,
    name: 'my-data.csv',
    isDir: false,
  },
]
</script>

<template>
  <div class="w-64 relative bg-gray-100 border-b border-gray-300">
    <p class="text-2xl font-semibold px-6 py-5">File Explorer</p>

    <Transition>
      <div v-if="isLoading" class="absolute z-10 inset-x-0 flex flex-col gap-2.5 mt-3 px-6 opacity-60">
        <div v-for="i in 4" :key="i" class="h-8 flex items-center">
          <div class="w-full h-6 bg-gray-300 rounded-md animate-pulse animate-duration-[1.25s] duration-75"></div>
        </div>
      </div>
    </Transition>

    <Transition>
      <div v-if="!isLoading" class="mt-2 px-3">
        <Tree :items="items" />
      </div>
    </Transition>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
