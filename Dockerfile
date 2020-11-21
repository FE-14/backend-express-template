FROM node:lts-alpine

WORKDIR /usr/local/app

COPY --chown=node:node . .

RUN rm *.lock \
    && yarn \
    && yarn build

EXPOSE 4000

CMD ["yarn", "start"]