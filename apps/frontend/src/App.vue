<script setup lang="ts">
import Sidebar from './views/Sidebar.vue'
import Viewer from './views/Viewer.vue'

</script>

<template>
  <div class="h-full hidden lg:flex bg-white">
    <Sidebar />
    <Viewer />
  </div>

  <div class="h-full flex lg:hidden items-center justify-center px-6">
    <p class="text-center text-gray-600">Please use another device with larger screen</p>
  </div>
</template>
