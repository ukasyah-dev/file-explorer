export interface Item {
  id: number;
  name: string;
  parentDir: string;
  isDir: boolean;
  items?: Item[];
  size: number;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ItemObject {
  id: number;
  name: string;
  parentDir: string;
  isDir: boolean;
  items?: { [key: string]: ItemObject };
  size: number;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListItemsRequest {
  path: string;
  isNested?: boolean;
  isDir?: boolean;
  cursor?: {
    isDir: boolean;
    name: String;
  };
  search?: string;
}

export interface ListItemsResponse {
  data: Item[];
}

export interface ViewItemResponse {
  data: Item;
}
