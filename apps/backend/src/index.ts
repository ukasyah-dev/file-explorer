import { drizzle } from "drizzle-orm/bun-sql";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { Config } from "./config";
import * as schema from "./db/schema";
import { ItemRepository } from "./repositories";
import { ItemService } from "./services";
import { itemController } from "./controllers";

const config = new Config();

const db = drizzle(config.databaseUrl, {
  logger: false,
  schema,
});

const itemRepository = new ItemRepository(db);
const itemService = new ItemService(itemRepository);

const router = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(itemController(itemService));

const app = router.listen(config.httpPort);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
