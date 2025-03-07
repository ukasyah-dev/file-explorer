import swagger from "@elysiajs/swagger";
import { drizzle } from "drizzle-orm/bun-sql";
import { Elysia } from "elysia";
import { Config } from "./config";
import * as schema from "./db/schema";
import { ItemRepository } from "./repositories";
import { ItemRoute } from "./routes";
import { ItemService } from "./services";

const config = new Config();

const db = drizzle(config.databaseUrl);

const totalItems = await db.$count(schema.items);

console.log(`Total items: ${totalItems}`);

const itemRepository = new ItemRepository(db);
const itemService = new ItemService(itemRepository);

const router = new Elysia().use(swagger()).get("/", () => "Hello Elysia");
new ItemRoute(router, itemService);

const app = router.listen(config.httpPort);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
