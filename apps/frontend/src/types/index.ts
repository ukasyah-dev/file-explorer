export type Item = {
  id: number
  name: string
  parentDir?: string
  isDir: boolean
  items?: Item[]
}
