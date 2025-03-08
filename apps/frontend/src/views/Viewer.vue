<script setup lang="ts">
import { viewer } from '@/stores';
</script>

<template>
  <div class="flex-1 flex">
    <p v-if="viewer.item" class="m-auto">
    <pre>{{ JSON.stringify(viewer, null, 2) }}</pre>
    </p>
    <div v-else class="m-auto text-center text-gray-500">
      Click a folder or file to view its contents
    </div>
  </div>
</template>
