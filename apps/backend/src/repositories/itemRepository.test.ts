import { beforeAll, describe, expect, test } from "bun:test";
import { BunSQLDatabase, drizzle } from "drizzle-orm/bun-sql";
import { ItemRepository } from "./itemRepository";

let db: BunSQLDatabase;
let itemRepository: ItemRepository;

beforeAll(() => {
  db = drizzle.mock();
  itemRepository = new ItemRepository(db);
});

describe("listDirectory", () => {
  test("success", async () => {
    const items = await itemRepository.listDirectory("/");
    expect(items).toHaveLength(0);
  });
});
