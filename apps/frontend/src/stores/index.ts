import type { Item } from '@/types'
import { reactive } from 'vue'

export const viewer = reactive<{ item?: Item }>({
  item: undefined,
})
