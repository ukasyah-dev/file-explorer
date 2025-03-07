<script setup lang="ts">
import type { Item } from '@/types';

defineProps<{
  item: Item
  isExpanded?: boolean
}>()
</script>

<template>
  <div v-if="item.isDir" class="relative">
    <!-- Expand icon button -->
    <div class="absolute inset-y-0 w-8 flex items-center justify-center">
      <button
        class="w-6 h-6 rounded-lg flex items-center justify-center transition duration-100 cursor-pointer hover:bg-gray-200"
        @click="$emit('chevronClick', item)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.175"
          stroke="currentColor" class="size-[1rem] stroke-gray-500" :class="{ 'rotate-90': isExpanded }">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <button @click="$emit('itemClick', item)"
      class="w-full flex items-center pl-8 pr-2.5 h-10 rounded-md transition duration-100 cursor-pointer hover:bg-gray-200">
      <span class="truncate">{{ item.name }}</span>
    </button>
  </div>
  <div v-else>
    <button @click="$emit('itemClick', item)"
      class="w-full flex items-center pl-1.5 pr-2.5 h-10 rounded-md transition duration-100 cursor-pointer hover:bg-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-[1.25rem] stroke-gray-500 mr-1.5 flex-shrink-0">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>

      <span class="truncate">{{ item.name }}</span>
    </button>
  </div>
</template>
