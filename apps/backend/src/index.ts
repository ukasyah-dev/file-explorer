import { Elysia } from "elysia";
import { Config } from "./config";

const config = new Config();

const app = new Elysia().get("/", () => "Hello Elysia").listen(config.httpPort);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
