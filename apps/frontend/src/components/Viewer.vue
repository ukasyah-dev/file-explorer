<script setup lang="ts">
import { viewer } from '@/stores';
</script>

<template>
  <div class="flex-1 flex">
    <p v-if="!viewer.path" class="m-auto text-center text-gray-500">
      Click a folder or file to view its contents
    </p>
    <p v-else class="m-auto">
    <pre>{{ JSON.stringify(viewer, null, 2) }}</pre>
    </p>
  </div>
</template>
