FROM node:lts-slim

ENV NODE_ENV=production
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

WORKDIR /usr/src/app

# Enable pnpm via Corepack and install dependencies from the lockfile.
RUN corepack enable
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build && pnpm prune --prod

EXPOSE 3000
RUN chown -R node:node /usr/src/app
USER node

CMD ["pnpm", "start"]
