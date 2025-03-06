import Elysia from "elysia";
import { Item } from "../models";
import { ItemService } from "../services";

export class ItemRoute {
  constructor(router: Elysia, itemService: ItemService) {
    router.get("/items/*", this.listDirectory.bind(itemService));
  }

  async listDirectory(): Promise<Item[]> {
    throw new Error("Not implemented");
  }

  async readFile(path: string): Promise<string> {
    throw new Error("Not implemented");
  }
}
