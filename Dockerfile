# Dependency stage
FROM node:16-alpine AS dependency

WORKDIR /app

COPY package*.json ./

# RUN npm install -g --omit=dev yarn

COPY . .

RUN yarn install

# Development stage
FROM dependency AS develop

ENV NODE_ENV=development

RUN yarn install
# RUN npm install --only=development

COPY . .

# COPY .env.example .env

CMD ["yarn", "start"]

# Build stage
FROM develop AS build

ENV NODE_ENV=production

# Production stage
FROM dependency AS production

CMD ["yarn", "start"]

EXPOSE 4173
