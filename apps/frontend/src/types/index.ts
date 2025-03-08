export type Item = {
  id: number
  name: string
  type: string
  folder: string
  items?: Item[]
}
