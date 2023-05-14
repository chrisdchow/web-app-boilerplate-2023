FROM  node:18.16-bullseye

WORKDIR /app/client

COPY package.json yarn.lock /client/

RUN corepack enable && yarn install

COPY . .

EXPOSE 3000
