import { drizzle } from "drizzle-orm/bun-sql";
import { Elysia } from "elysia";
import { Config } from "./config";
import { ItemRepository } from "./repositories";
import { ItemService } from "./services";
import { ItemRoute } from "./routes/itemRoute";

const config = new Config();

const db = drizzle(config.databaseUrl);

const itemRepository = new ItemRepository(db);
const itemService = new ItemService(itemRepository);

const router = new Elysia().get("/", () => "Hello Elysia");
new ItemRoute(router, itemService);

const app = router.listen(config.httpPort);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
