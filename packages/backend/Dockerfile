FROM oven/bun:1.2.4 AS builder
WORKDIR /code
COPY . .
WORKDIR /code/packages/backend
RUN --mount=type=cache,target=/root/.bun,sharing=locked \
  bun install --frozen-lockfile --ignore-scripts && \
  bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

FROM gcr.io/distroless/base-debian12
WORKDIR /runtime
COPY --from=builder /code/packages/backend/server ./server
EXPOSE 3000
CMD ["./server"]
