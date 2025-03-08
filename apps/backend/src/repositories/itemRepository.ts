import { and, eq, sql } from "drizzle-orm";
import { BunSQLDatabase } from "drizzle-orm/bun-sql";
import * as schema from "../db/schema";
import {
  Item,
  ItemObject,
  ListItemsRequest,
  ListItemsResponse,
  ViewItemResponse,
} from "../models";

export interface IItemRepository {
  listItems(req: ListItemsRequest): Promise<ListItemsResponse>;
  viewItem(path: string): Promise<ViewItemResponse>;
}

export class ItemRepository implements IItemRepository {
  private db: BunSQLDatabase<typeof schema>;

  constructor(db: BunSQLDatabase<typeof schema>) {
    this.db = db;
  }

  async listItems(req: ListItemsRequest): Promise<ListItemsResponse> {
    const path = "/" + req.path;
    const limit = 25;

    let items: Item[] = [];

    try {
      // Drizzle ORM doesn't support gt operator for string column, so we have to use raw SQL
      let query = sql`SELECT * FROM ${schema.items}`;

      // If the request is nested, all items under the path will be retrieved
      // Otherwise, only items in the path will be retrieved
      if (req.isNested) {
        query.append(sql` WHERE ${schema.items.parentDir} LIKE ${`${path}%`}`);
      } else {
        query.append(sql` WHERE ${schema.items.parentDir} = ${path}`);
      }

      if (req.isDir) {
        query.append(sql` AND ${schema.items.isDir} = ${req.isDir}`);
      }

      if (req.cursor) {
        query.append(sql` AND ${schema.items.name} > ${req.cursor.name}`);
      }

      if (req.isNested) {
        query.append(
          sql` ORDER BY LOWER(${schema.items.parentDir}) ASC, LOWER(${schema.items.name}) ASC`
        );
      } else {
        query.append(
          sql` ORDER BY ${schema.items.isDir} DESC, LOWER(${schema.items.name}) ASC`
        );
      }

      if (!req.isNested) {
        query.append(sql` LIMIT ${limit}`);
      }

      let rows = await this.db.execute(query);

      if (!req.isNested) {
        for (const row of rows) {
          items.push({
            id: row.id,
            name: row.name,
            parentDir: row.parentDir,
            isDir: row.isDir,
            size: row.size,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          });
        }
      } else {
        let itemObjects: { [x: string]: ItemObject } = {};

        for (const row of rows) {
          if (row.parentDir === "/") {
            itemObjects[row.name] = {
              id: row.id,
              name: row.name,
              parentDir: row.parentDir,
              isDir: row.isDir,
              items: row.isDir ? {} : undefined,
              size: row.size,
              createdAt: row.createdAt,
              updatedAt: row.updatedAt,
            };
          } else {
            let parentDirSegments = row.parentDir.split("/");
            let currentItem: ItemObject | null = null;

            for (const segment of parentDirSegments) {
              if (!segment) continue;
              currentItem = itemObjects[segment];
            }

            if (currentItem && currentItem.items) {
              currentItem.items[row.name] = {
                id: row.id,
                name: row.name,
                parentDir: row.parentDir,
                isDir: row.isDir,
                items: row.isDir ? {} : undefined,
                size: row.size,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
              };
            }
          }
        }

        // Transform the object into an array
        for (const key in itemObjects) {
          items.push(this.transformItemObjectToItem(itemObjects[key]));
        }
      }
    } catch (error) {
      console.error(error);
    }

    return {
      data: items,
    };
  }

  transformItemObjectToItem(itemObject: ItemObject): Item {
    return {
      id: itemObject.id,
      name: itemObject.name,
      parentDir: itemObject.parentDir,
      isDir: itemObject.isDir,
      items: itemObject.items
        ? Object.entries(itemObject.items).map(([, item]) =>
            this.transformItemObjectToItem(item)
          )
        : undefined,
      size: itemObject.size,
      createdAt: itemObject.createdAt,
      updatedAt: itemObject.updatedAt,
    };
  }

  async viewItem(path: string): Promise<ViewItemResponse> {
    let segments = path.split("/");
    let name = segments[segments.length - 1];
    let parentDir = "/" + segments.slice(0, segments.length - 1).join("/");

    let row = await this.db.query.items.findFirst({
      where: and(
        eq(schema.items.name, name),
        eq(schema.items.parentDir, parentDir),
        eq(schema.items.isDir, false)
      ),
    });

    if (!row) {
      throw new Error("Item not found");
    }

    return {
      data: {
        id: row.id,
        name: row.name,
        parentDir: row.parentDir,
        isDir: row.isDir,
        size: row.size,
        content: row.content === null ? undefined : row.content,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
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

  viewItem(path: string): Promise<ViewItemResponse> {
    return Promise.resolve({ data: this.items[0] });
  }
}
