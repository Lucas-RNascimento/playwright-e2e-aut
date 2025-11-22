FROM node:18.12.1-bullseye

WORKDIR /usr/src/app

# copia apenas package*.json primeiro para aproveitar cache
COPY package*.json ./

# instala dependências no ambiente Linux do container
RUN npm ci --production

# copia o resto do código
COPY . .

# rebuild do módulo nativo dentro do container caso precise
RUN npm rebuild better-sqlite3 --build-from-source || true

EXPOSE 3333

HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=5 \
  CMD wget -qO- http://localhost:3333/tasks || exit 1

CMD ["npm", "run", "start"]
