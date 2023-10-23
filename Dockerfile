ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine as builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile && \
    yarn next build

FROM node:${NODE_VERSION}-alpine AS prod

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]