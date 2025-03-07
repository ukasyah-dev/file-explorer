<script setup lang="ts">
import type { Item } from '@/types';
import Tree from './Tree.vue';

const items: Item[] = [
  {
    id: 1,
    name: 'Home',
    isDir: true,
    isOpen: true,
    items: [
      {
        id: 4,
        name: 'index.html',
        isDir: false,
      }
    ],
  },
  {
    id: 2,
    name: 'Documents',
    isDir: true,
    items: [],
  },
  {
    id: 3,
    name: 'my-data.csv',
    isDir: false,
  },
];
</script>

<template>
  <div class="w-64 bg-gray-100 border-b border-gray-300">
    <p class="text-2xl font-semibold px-6 py-5">
      File Explorer
    </p>

    <div class="mt-2 px-3">
      <Tree :items="items" />
    </div>
  </div>
</template>
