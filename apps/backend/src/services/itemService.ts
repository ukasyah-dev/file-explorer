import {
  ListItemsRequest,
  ListItemsResponse,
  ViewItemResponse,
} from "../models";
import { IItemRepository } from "../repositories";

export class ItemService {
  constructor(private itemRepository: IItemRepository) {}

  async listItems(req: ListItemsRequest): Promise<ListItemsResponse> {
    return this.itemRepository.listItems(req);
  }

  async viewItem(path: string): Promise<ViewItemResponse> {
    return this.itemRepository.viewItem(path);
  }
}
