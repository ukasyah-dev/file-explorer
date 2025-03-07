export interface Item {
  id: number;
  name: string;
  parentDir: string;
  isDir: boolean;
  size: number;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListItemsResponse {
  data: Item[];
}

export interface ViewItemResponse {
  data: Item;
}
