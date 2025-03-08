<script setup lang="ts">
import type { Item } from '@/types';

defineProps<{
  item: Item
  isExpanded?: boolean
}>()
</script>

<template>
  <div class="relative">
    <!-- Expand icon button -->
    <div v-if="item.items && item.items.length" class="absolute inset-y-0 w-8 flex items-center justify-center">
      <button
        class="w-6 h-6 rounded-lg flex items-center justify-center transition duration-100 cursor-pointer hover:bg-gray-200"
        @click="$emit('chevronClick', item)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.175"
          stroke="currentColor" class="size-[1rem] stroke-gray-600" :class="{ 'rotate-90': isExpanded }">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <button @click="$emit('itemClick', item)"
      class="w-full flex items-center pl-8 pr-2.5 h-10 rounded-md transition duration-100 cursor-pointer hover:bg-gray-200">
      <span class="truncate">{{ item.name }}</span>
    </button>
  </div>
</template>
