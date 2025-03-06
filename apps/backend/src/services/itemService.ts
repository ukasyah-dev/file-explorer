import { Item } from "../models";
import { IItemRepository } from "../repositories";

export class ItemService {
  constructor(private itemRepository: IItemRepository) {}

  async listDirectory(path: string): Promise<Item[]> {
    return this.itemRepository.listDirectory(path);
  }

  async readFile(path: string): Promise<string> {
    return this.itemRepository.readFile(path);
  }
}
