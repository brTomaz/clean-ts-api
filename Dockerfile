FROM node:12
WORKDIR /usr/src/clean-ts-api
COPY ./package.json .
RUN yarn install --only=prod
