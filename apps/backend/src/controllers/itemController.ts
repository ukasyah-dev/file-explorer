import Elysia, { t } from "elysia";
import { ItemService } from "../services";

export const itemController = (itemService: ItemService) => {
  return new Elysia().group("/items", (app) => {
    app.get("/browse/*", async ({ params, query }) => {
      const isNested = "isNested" in query && query["isNested"] === "true";
      const isDir = "isDir" in query && query["isDir"] === "true";

      let cursor: { isDir: boolean; name: string } | undefined = undefined;

      if ("cursor.isDir" in query && "cursor.name" in query) {
        cursor = {
          isDir: query["cursor.isDir"] === "true",
          name: query["cursor.name"],
        };
      }

      const result = await itemService.listItems({
        path: params["*"],
        isNested,
        isDir,
        cursor,
      });
      return result;
    });

    app.get("/view/*", async ({ params }) => {
      const result = await itemService.viewItem(params["*"]);
      return result;
    });

    return app;
  });
};
