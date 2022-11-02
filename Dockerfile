ARG NODE_VERSION=16.15.0

FROM node:${NODE_VERSION}-alpine as builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile && \
    yarn build

ARG BUILD_STORYBOOK
RUN if [[ "$BUILD_STORYBOOK" = "true" ]] ; then yarn storybook:build ; fi

FROM node:${NODE_VERSION} AS prod

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

# Storybook
COPY --from=builder /app/storybook-static ./app/storybook

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]