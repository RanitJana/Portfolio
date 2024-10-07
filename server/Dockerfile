FROM node:22.9.0-alpine

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

ENTRYPOINT [ "node","index.js" ]
