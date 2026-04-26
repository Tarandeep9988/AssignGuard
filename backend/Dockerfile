# -------- Stage 1: Build --------
FROM node:lts-slim AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

# install ALL deps (dev + prod)
RUN pnpm install

COPY . .

# build TypeScript → dist/
RUN pnpm build


# -------- Stage 2: Run --------
FROM node:lts-slim

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

# install ONLY production deps
RUN pnpm install --prod

# copy built files from builder
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/server.js"]