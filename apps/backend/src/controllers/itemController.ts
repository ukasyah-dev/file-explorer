import Elysia, { t } from "elysia";
import { ItemService } from "../services";

export const itemController = (itemService: ItemService) => {
  return new Elysia().group("/items", (app) => {
    app.get(
      "/browse/*",
      async ({ params }) => {
        const result = await itemService.listItems(params["*"]);
        return result;
      },
      {
        detail: {
          summary: "List directory",
          description: "List directory by path",
          tags: ["Item"],
        },
        response: {
          200: t.Object({
            data: t.Array(
              t.Object({
                id: t.Number(),
                name: t.String(),
                parentDir: t.String(),
                isDir: t.Boolean(),
                size: t.Number(),
                createdAt: t.Date(),
                updatedAt: t.Date(),
              })
            ),
          }),
        },
      }
    );

    app.get(
      "/view/*",
      async ({ params }) => {
        const result = await itemService.viewItem(params["*"]);
        return result;
      },
      {
        detail: {
          summary: "View item",
          description: "View item detail by path",
          tags: ["Item"],
        },
        response: {
          200: t.Object({
            data: t.Object({
              id: t.Number(),
              name: t.String(),
              parentDir: t.String(),
              isDir: t.Boolean(),
              size: t.Number(),
              content: t.Optional(t.String()),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            }),
          }),
        },
      }
    );

    return app;
  });
};
