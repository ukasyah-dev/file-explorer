import { and, asc, eq, ilike, sql } from "drizzle-orm";
import { BunSQLDatabase } from "drizzle-orm/bun-sql";
import * as schema from "../db/schema";
import {
  Item,
  ItemObject,
  ListItemsRequest,
  ListItemsResponse,
} from "../models";

export interface IItemRepository {
  listItems(req: ListItemsRequest): Promise<ListItemsResponse>;
}

export class ItemRepository implements IItemRepository {
  private db: BunSQLDatabase<typeof schema>;

  constructor(db: BunSQLDatabase<typeof schema>) {
    this.db = db;
  }

  async listItems(req: ListItemsRequest): Promise<ListItemsResponse> {
    let items: Item[] = [];

    try {
      items = await this.db.query.items.findMany({
        where: and(
          req.type ? eq(schema.items.type, req.type) : undefined,
          req.recursive
            ? ilike(schema.items.folder, `${req.folder}%`)
            : eq(schema.items.folder, req.folder)
        ),
        orderBy: req.recursive
          ? sql`LOWER(${schema.items.folder}) ASC, LOWER(${schema.items.name}) ASC`
          : sql`${schema.items.type} DESC, LOWER(${schema.items.name}) ASC`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to list items");
    }

    if (req.recursive) {
      // Create an object to store items by their name for quick lookup
      let itemObjects: { [x: string]: ItemObject } = {};

      for (const item of items) {
        if (item.folder === "/") {
          itemObjects[item.name] = {
            id: item.id,
            name: item.name,
            folder: item.folder,
            type: item.type,
            items: item.type === "folder" ? {} : undefined,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        } else {
          const folderSegments = item.folder.split("/");

          let currentItem: ItemObject = itemObjects[folderSegments[1]];

          // Find the parent folder
          for (const segment of folderSegments.slice(2)) {
            if (!segment) continue;

            if (currentItem.items) {
              currentItem = currentItem.items[segment];
            }
          }

          // Add the item to the parent folder
          if (currentItem.items) {
            currentItem.items[item.name] = {
              id: item.id,
              name: item.name,
              folder: item.folder,
              type: item.type,
              items: item.type === "folder" ? {} : undefined,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            };
          }
        }
      }

      // Reset the array
      items = [];

      // Transform the object into an array
      for (const key in itemObjects) {
        items.push(this.transformItemObjectToItem(itemObjects[key]));
      }
    }

    return {
      data: items,
    };
  }

  transformItemObjectToItem(itemObject: ItemObject): Item {
    return {
      id: itemObject.id,
      name: itemObject.name,
      type: itemObject.type,
      folder: itemObject.folder,
      items: itemObject.items
        ? Object.entries(itemObject.items).map(([, item]) =>
            this.transformItemObjectToItem(item)
          )
        : undefined,
      createdAt: itemObject.createdAt,
      updatedAt: itemObject.updatedAt,
    };
  }
}

export class MockItemRepository implements IItemRepository {
  private items: Item[];

  constructor(items?: Item[]) {
    this.items = items || [];
  }

  listItems(req: ListItemsRequest): Promise<ListItemsResponse> {
    return Promise.resolve({ data: this.items });
  }
}
