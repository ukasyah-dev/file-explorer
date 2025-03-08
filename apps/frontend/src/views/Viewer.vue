<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { viewer } from '@/stores';
import type { Item } from '@/types';
import axios from 'axios';
import wait from 'wait';

let isLoading = ref(true)
let items = ref<Item[]>([])

let path = computed(() => {
  return (viewer.item?.folder !== "/" ? viewer.item?.folder + "/" : "/") + viewer.item?.name
})

watch(viewer, async (v) => {
  isLoading.value = true

  await wait(350)

  let _items: Item[] = []

  const res = await axios.get<{ data: Item[] }>(`/items/browse${path.value}`)

  res.data.data.forEach(item => {
    _items.push(item)
  })

  items.value = _items
  isLoading.value = false
})
</script>

<template>
  <div class="flex-1 overflow-auto">
    <div v-if="viewer.item" class="w-full h-full max-w-5xl mx-auto px-8">
      <div class="h-20 flex items-center">
        <h2 class="text-xl font-semibold">
          {{ path }}
        </h2>
      </div>

      <div class="relative mt-3">
        <!-- Skeleton -->
        <Transition>
          <div v-if="isLoading" class="absolute z-10 inset-x-0 grid grid-cols-6 xl:grid-cols-7 gap-8 opacity-60">
            <div v-for="i in 3" :key="i" class="flex flex-col items-center gap-3">
              <div class="h-16 flex items-center justify-center">
                <div class="w-20 h-16 bg-gray-300 rounded-md animate-pulse animate-duration-[1.25s] duration-75"></div>
              </div>
              <div class="w-2/3 h-5 bg-gray-300 rounded-md animate-pulse animate-duration-[1.25s] duration-75"></div>
            </div>
          </div>
        </Transition>

        <Transition>
          <div v-if="!isLoading" class="grid grid-cols-6 xl:grid-cols-7 gap-8">
            <div v-for="item in items" :key="item.id">
              <div v-if="item.type === 'folder'" class="flex flex-col items-center gap-1.5 cursor-pointer"
                @click="viewer.item = item">
                <div class="h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-16 h-16 text-gray-400">
                    <path fill="currentColor"
                      d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
                  </svg>
                </div>
                <p class="text-center">{{ item.name }}</p>
              </div>
              <div v-else class="flex flex-col items-center gap-2 overflow-hidden">
                <div class="h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-14 h-14 text-gray-400">
                    <path fill="currentColor"
                      d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
                  </svg>
                </div>
                <div class="w-full overflow-hidden">
                  <p class="truncate text-center">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div v-else class="h-full flex items-center justify-center text-center text-gray-500">
      Select a folder to view its contents
    </div>
  </div>
</template>
