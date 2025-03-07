import { BunSQLDatabase } from "drizzle-orm/bun-sql";
import * as schema from "../db/schema";
import { Item } from "../models";
import { eq } from "drizzle-orm";

export interface IItemRepository {
  listDirectory(path: string): Promise<Item[]>;
  readFile(path: string): Promise<string>;
}

export class ItemRepository implements IItemRepository {
  private db: BunSQLDatabase;

  constructor(db: BunSQLDatabase) {
    this.db = db;
  }

  async listDirectory(path: string): Promise<Item[]> {
    return this.db
      .select()
      .from(schema.items)
      .where(eq(schema.items.parentDir, path));
  }

  async readFile(path: string): Promise<string> {
    throw new Error("Not implemented");
  }
}

export class MockItemRepository implements IItemRepository {
  private items: Item[];

  constructor(items?: Item[]) {
    this.items = items || [];
  }

  listDirectory(path: string): Promise<Item[]> {
    return Promise.resolve(this.items);
  }

  readFile(path: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
