import Elysia, { t } from "elysia";
import { ItemService } from "../services";

export const itemController = (itemService: ItemService) => {
  return new Elysia().group("/items", (app) => {
    app.get(
      "/*",
      async ({ params }) => {
        const result = await itemService.listDirectory(params["*"]);
        return result;
      },
      {
        detail: {
          summary: "List directory",
          description: "List directory by path",
          tags: ["Item"],
        },
        response: {
          200: t.Array(
            t.Object({
              id: t.Number(),
              name: t.String(),
              parentDir: t.String(),
              isDir: t.Boolean(),
              size: t.Number(),
            })
          ),
        },
      }
    );

    return app;
  });
};
