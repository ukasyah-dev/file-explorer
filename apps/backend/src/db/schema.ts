import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  parentDir: text().notNull(),
  isDir: boolean().notNull(),
  size: integer().notNull(),
});
