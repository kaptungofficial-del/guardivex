FROM node:20.19-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/adapters/package.json packages/adapters/package.json
COPY packages/policy/package.json packages/policy/package.json
COPY packages/queues/package.json packages/queues/package.json
RUN npm ci --no-audit --no-fund --loglevel=warn \
	&& test -x node_modules/.bin/prisma \
	&& test -x node_modules/.bin/tsc

FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run db:generate
RUN npx tsc -b packages/shared packages/adapters packages/policy packages/queues packages/database apps/api

FROM node:20.19-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=build /app/packages/database/package.json ./packages/database/package.json
COPY --from=build /app/packages/adapters/package.json ./packages/adapters/package.json
COPY --from=build /app/packages/policy/package.json ./packages/policy/package.json
COPY --from=build /app/packages/queues/package.json ./packages/queues/package.json
COPY --from=build /app/packages/database/prisma ./packages/database/prisma
COPY --from=build /app/packages/database/dist ./packages/database/dist
COPY --from=build /app/packages/adapters/dist ./packages/adapters/dist
COPY --from=build /app/packages/policy/dist ./packages/policy/dist
COPY --from=build /app/packages/queues/dist ./packages/queues/dist
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
EXPOSE 4000
CMD ["node", "apps/api/dist/server.js"]
