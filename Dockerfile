FROM node:16-alpine

ENV NODE_ENV development

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]
