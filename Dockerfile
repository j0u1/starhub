# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./

# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY . .

RUN bun --bun run build

# copy production dependencies and source code into final image
FROM oven/bun:1 AS production
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output /app

# СНОСИМ битые симлинки от Nitro и заставляем Bun скачать всё по-честному
RUN cd /app/server && \
    rm -rf node_modules && \
    bun install --ignore-scripts

# run the app
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "/app/server/index.mjs" ]