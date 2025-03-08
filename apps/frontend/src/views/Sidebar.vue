<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Tree from '@/components/Tree.vue'
import type { Item } from '@/types'
import axios from 'axios'
import wait from 'wait'

let isLoading = ref(true)
let items = ref<Item[]>([])

onMounted(async () => {
  await wait(350)

  try {
    let _items: Item[] = []

    const res = await axios.get<{ data: Item[] }>('/items/browse/?type=folder&recursive=true')

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
  <div class="w-72 h-full flex flex-col relative bg-gray-100 border-b border-gray-300">
    <div class="px-6 h-20 flex items-center flex-shrink-0">
      <p class="text-xl font-semibold">File Explorer</p>
    </div>

    <div class="flex-1 overflow-auto py-2">
      <Transition>
        <div v-if="isLoading" class="absolute z-10 inset-x-0 flex flex-col gap-2.5 mt-1 px-6 opacity-60">
          <div v-for="i in 4" :key="i" class="h-8 flex items-center">
            <div class="w-full h-6 bg-gray-300 rounded-md animate-pulse animate-duration-[1.25s] duration-75"></div>
          </div>
        </div>
      </Transition>

      <Transition>
        <div v-if="!isLoading" class="px-3">
          <Tree :items="items" />
        </div>
      </Transition>
    </div>
  </div>
</template>
