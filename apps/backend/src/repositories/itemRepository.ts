import { and, eq, sql } from "drizzle-orm";
import { BunSQLDatabase } from "drizzle-orm/bun-sql";
import * as schema from "../db/schema";
import {
  Item,
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
    const limit = 2;

    let items: Item[] = [];

    try {
      // Drizzle ORM doesn't support gt operator for string column, so we have to use raw SQL
      let query = sql`SELECT "id", "name", "parentDir", "isDir", "size", "createdAt", "updatedAt"`;
      query.append(sql` FROM ${schema.items}`);
      query.append(sql` WHERE ${schema.items.parentDir} = ${path}`);

      if (req.cursor) {
        query.append(sql` AND ${schema.items.name} > ${req.cursor.name}`);
      }

      query.append(
        sql` ORDER BY ${schema.items.isDir} DESC, ${schema.items.name} ASC`
      );
      query.append(sql` LIMIT ${limit}`);

      const rows = await this.db.execute(query);

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
    } catch (error) {
      console.error(error);
    }

    return {
      data: items,
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
