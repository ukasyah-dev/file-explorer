import { beforeAll, describe, expect, test } from "bun:test";
import { MockItemRepository } from "./itemRepository";

describe("listItems", () => {
  let itemRepository: MockItemRepository;

  beforeAll(async () => {
    itemRepository = new MockItemRepository([]);
  });

  test("success", async () => {
    const items = await itemRepository.listItems({ folder: "/" });
    expect(items).toHaveLength(3);
  });
});
