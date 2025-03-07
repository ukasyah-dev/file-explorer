<script setup lang="ts">
import type { Item } from '@/types';
import { ref } from 'vue';
import TreeItem from './TreeItem.vue';
import { viewer } from '@/stores';

defineProps<{
  items: Item[]
}>()

const expandedItemIds = ref<number[]>([])

const toggleOpen = (item: Item) => {
  viewer.item = item
}

const toggleExpand = (item: Item) => {
  if (expandedItemIds.value.includes(item.id)) {
    expandedItemIds.value = expandedItemIds.value.filter((i) => i !== item.id);
  } else {
    expandedItemIds.value.push(item.id);
  }
}
</script>

<template>
  <div class="flex flex-col items-stretch gap-0.5">
    <div v-for="item in items" :key="item.id">
      <div v-if="item.isDir">
        <TreeItem :item="item" :is-expanded="expandedItemIds.includes(item.id)" @item-click="toggleOpen"
          @chevron-click="toggleExpand" />

        <div v-if="expandedItemIds.includes(item.id)" class="pl-6">
          <Tree v-if="item.items" :items="item.items" />
        </div>
      </div>
      <div v-else>
        <TreeItem :item="item" @item-click="toggleOpen" />
      </div>
    </div>
  </div>
</template>
