import Elysia from "elysia";
import { ItemService } from "../services";

export const itemController = (itemService: ItemService) => {
  return new Elysia().group("/items", (app) => {
    app.get("/browse/*", async ({ params, query }) => {
      const result = await itemService.listItems({
        folder: "/" + params["*"],
        type: query.type,
        recursive: query.recursive === "true",
      });
      return result;
    });

    return app;
  });
};
