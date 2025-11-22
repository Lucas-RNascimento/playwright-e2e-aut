FROM node:18.12.1-bullseye AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
FROM node:18.12.1-bullseye
WORKDIR /usr/src/app
RUN npm i -g http-server
COPY --from=builder /usr/src/app .
EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=5 \
  CMD wget -qO- http://localhost:8080 || exit 1
CMD ["npm", "run", "start"]
