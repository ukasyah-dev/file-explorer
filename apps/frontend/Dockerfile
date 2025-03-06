FROM oven/bun:1.2.4 AS builder
WORKDIR /code
COPY . .
WORKDIR /code/apps/frontend
RUN --mount=type=cache,target=/root/.bun,sharing=locked \
  bun install --frozen-lockfile --ignore-scripts && \
  bun run build

FROM busybox:1.37.0
WORKDIR /runtime
COPY --from=builder /code/apps/frontend/dist .
EXPOSE 3000
CMD ["busybox", "httpd", "-f", "-p", "3000"]
