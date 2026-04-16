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

# Copy built app from Stage 1
COPY --from=builder /app/.next ./.next

# install ONLY production deps
RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]