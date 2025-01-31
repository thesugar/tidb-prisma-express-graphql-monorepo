# Build Stage
FROM node:18.19.0-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM node:18.19.0-slim
WORKDIR /app
COPY --from=base /app/dist /app/dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "8080"]
