import Elysia from "elysia";
import { Item } from "../models";
import { ItemService } from "../services";

export class ItemRoute {
  private itemService: ItemService;

  constructor(router: Elysia, itemService: ItemService) {
    this.itemService = itemService;

    router.get("/items/*", this.listDirectory.bind(this));
  }

  async listDirectory(): Promise<Item[]> {
    console.log("listDirectory start");
    const result = await this.itemService.listDirectory("/");
    console.log("listDirectory end");
    return result;
  }

  async readFile(path: string): Promise<string> {
    throw new Error("Not implemented");
  }
}
