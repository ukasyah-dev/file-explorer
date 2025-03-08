<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Tree from '@/components/Tree.vue'
import type { Item } from '@/types'
import axios from 'axios'
import wait from 'wait'

let isLoading = ref(true)
let items = ref<Item[]>([])

onMounted(async () => {
  await wait(1000)

  try {
    let _items: Item[] = []

    const res = await axios.get<{ data: Item[] }>('/items/browse/?isNested=true&isDir=true')

    res.data.data.forEach(item => {
      _items.push(item)
    })

    items.value = _items
    isLoading.value = false
  } catch (error) {
    alert(error)
  }
})
</script>

<template>
  <div class="w-64 relative bg-gray-100 border-b border-gray-300">
    <p class="text-2xl font-semibold px-6 py-5">File Explorer</p>

    <Transition>
      <div v-if="isLoading" class="absolute z-10 inset-x-0 flex flex-col gap-2.5 mt-3 px-6 opacity-60">
        <div v-for="i in 4" :key="i" class="h-8 flex items-center">
          <div class="w-full h-6 bg-gray-300 rounded-md animate-pulse animate-duration-[1.25s] duration-75"></div>
        </div>
      </div>
    </Transition>

    <Transition>
      <div v-if="!isLoading" class="mt-2 px-3">
        <Tree :items="items" />
      </div>
    </Transition>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
