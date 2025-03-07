import { ListItemsResponse, ViewItemResponse } from "../models";
import { IItemRepository } from "../repositories";

export class ItemService {
  constructor(private itemRepository: IItemRepository) {}

  async listItems(path: string): Promise<ListItemsResponse> {
    return this.itemRepository.listItems(path);
  }

  async viewItem(path: string): Promise<ViewItemResponse> {
    return this.itemRepository.viewItem(path);
  }
}
