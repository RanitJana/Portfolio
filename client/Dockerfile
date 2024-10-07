FROM node:22.9.0-alpine AS final

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

ENTRYPOINT [ "npm","run","dev" ]
