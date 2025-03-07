import { beforeAll, describe, expect, test } from "bun:test";
import { MockItemRepository } from "./itemRepository";

describe("listDirectory", () => {
  let itemRepository: MockItemRepository;

  beforeAll(async () => {
    itemRepository = new MockItemRepository([
      { id: 1, name: "test.txt", parentDir: "/", isDir: false, size: 0 },
      { id: 2, name: "test2.txt", parentDir: "/", isDir: false, size: 0 },
      { id: 3, name: "test3.txt", parentDir: "/", isDir: false, size: 0 },
    ]);
  });

  test("success", async () => {
    const items = await itemRepository.listDirectory("/");
    expect(items).toHaveLength(3);
  });
});
