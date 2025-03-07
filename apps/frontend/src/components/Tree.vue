<script setup lang="ts">
import type { Item } from '@/types';
import { ref } from 'vue';
import TreeItem from './TreeItem.vue';
import { viewer } from '@/stores';

defineProps<{
  items: Item[]
}>()

const openItemIds = ref<number[]>([1])

const toggleOpen = (item: Item) => {
  viewer.path = item.name
  viewer.isDir = item.isDir
}

const toggleExpand = (item: Item) => {
  if (openItemIds.value.includes(item.id)) {
    openItemIds.value = openItemIds.value.filter((i) => i !== item.id);
  } else {
    openItemIds.value.push(item.id);
  }

}
</script>

<template>
  <div class="flex flex-col items-stretch gap-0.5">
    <div v-for="item in items" :key="item.id">
      <div v-if="item.isDir">
        <TreeItem :item="item" :is-expanded="openItemIds.includes(item.id)" @item-click="toggleOpen"
          @chevron-click="toggleExpand" />


        <!-- <button @click="toggleOpen(item.id)" class="w-full flex items-center px-3 h-10 rounded-md hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="size-[1rem] mr-1" :class="{ 'rotate-90': openItemIds.includes(item.id) }">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>

          <span class="">{{ item.name }}</span>
        </button> -->

        <div class="pl-12">
          <Tree v-if="item.items" :items="item.items" />
        </div>
      </div>
      <div v-else>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
