FROM node:carbon

COPY ./package.json /app/package.json

WORKDIR /app

RUN yarn

COPY . /app

CMD ["yarn", "start:dev"]
