ARG NODE_VERSION=16.15.0

FROM node:${NODE_VERSION}-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile

FROM deps as frontend_dev
VOLUME /app/node_modules
CMD ["yarn", "next"]

FROM frontend_dev AS frontend_prod_build
RUN yarn build

FROM node:${NODE_VERSION} AS frontend_prod
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=frontend_prod_build /app/public ./public
COPY --from=frontend_prod_build /app/package.json ./package.json
COPY --from=frontend_prod_build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=frontend_prod_build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=frontend_prod_build /app/next.config.js ./next.config.js
COPY --from=frontend_prod_build /app/next-i18next.config.js ./next-i18next.config.js
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]