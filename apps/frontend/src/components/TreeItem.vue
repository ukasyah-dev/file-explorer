<script setup lang="ts">
import type { Item } from '@/types';

defineProps<{
  item: Item
  isExpanded?: boolean
  // onClick: (id: number) => void
  // onChevronClick?: (id: number) => void
}>()

</script>

<template>
  <div v-if="item.isDir" class="relative">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
      class="absolute size-[1rem] mr-1" :class="{ 'rotate-90': isExpanded }" @click="$emit('chevronClick', item)">
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>

    <button @click="$emit('itemClick', item)" class="w-full flex items-center px-3 h-10 rounded-md hover:bg-gray-200">
      <span class="">{{ item.name }}</span>
    </button>
  </div>
</template>
