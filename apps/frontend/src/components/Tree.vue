<script setup lang="ts">
import type { Item } from '@/types';

defineProps<{
  items: Item[]
}>()

const renderItems = (items: Item[]) => {

}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div v-for="item in items" :key="item.id">
      <button v-if="item.isDir" class="flex items-center px-4 h-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.25"
          stroke="currentColor" class="w-[1.125rem] h-[1.125rem] mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
        <span class="-mt-1">{{ item.name }}</span>
        <span>[+]</span>
      </button>
      <div v-else>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
