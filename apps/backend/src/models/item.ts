export interface Item {
  id: number;
  name: string;
  type: string;
  folder: string;
  items?: Item[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemObject {
  id: number;
  name: string;
  type: string;
  folder: string;
  items?: { [key: string]: ItemObject };
  createdAt: Date;
  updatedAt: Date;
}

export interface ListItemsRequest {
  folder: string;
  type?: string;
  recursive?: boolean;
  search?: string;
}

export interface ListItemsResponse {
  data: Item[];
}
