FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /repo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/

FROM base AS build
RUN pnpm install --frozen-lockfile --filter api
COPY tsconfig.base.json ./
COPY apps/api apps/api
RUN pnpm --filter api build

FROM base AS deps-prod
RUN pnpm install --frozen-lockfile --prod --filter api

FROM node:24-alpine
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=deps-prod /repo ./
COPY --from=build /repo/apps/api/dist apps/api/dist
WORKDIR /repo/apps/api
EXPOSE 3333
CMD ["node", "dist/server.js"]
