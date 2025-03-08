FROM oven/bun:1.2.4 AS builder
RUN apt-get update && \
  apt-get install -y unzip && \
  rm -rf /var/lib/apt/lists/*
WORKDIR /code
COPY . .
RUN --mount=type=cache,target=/root/.bun,sharing=locked \
  --mount=type=cache,target=/root/.cache,sharing=locked \
  bun install --frozen-lockfile
WORKDIR /code/apps/frontend
ENV VITE_API_URL=https://file-explorer-backend.ukasyah.dev
RUN bun run build-only

FROM busybox:1.37.0
WORKDIR /runtime
COPY --from=builder /code/apps/frontend/dist .
EXPOSE 3000
CMD ["busybox", "httpd", "-f", "-p", "3000"]
