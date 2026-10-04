FROM node:26-bookworm-slim

WORKDIR /opt/discord-template
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node bin/discord-template.mjs ./bin/discord-template.mjs
COPY --chown=node:node commands ./commands
COPY --chown=node:node events ./events
COPY --chown=node:node locales ./locales
COPY --chown=node:node src ./src

USER node
CMD ["node", "bin/discord-template.mjs"]
