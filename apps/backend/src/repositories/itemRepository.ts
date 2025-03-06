import { BunSQLDatabase } from "drizzle-orm/bun-sql";
import { Item } from "../models";

export interface IItemRepository {
  listDirectory(path: string): Promise<Item[]>;
  readFile(path: string): Promise<string>;
}

export class ItemRepository implements IItemRepository {
  constructor(db: BunSQLDatabase) {}

  async listDirectory(path: string): Promise<Item[]> {
    throw new Error("Not implemented");
  }

  async readFile(path: string): Promise<string> {
    throw new Error("Not implemented");
  }
}
