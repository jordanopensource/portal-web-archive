FROM node:16.13-alpine3.13 as INITIAL

RUN mkdir -p /var/www/dockerize-nuxt/portal-web
WORKDIR /var/www/dockerize-nuxt/portal-web

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:16.13-alpine3.13

WORKDIR /app

RUN npm add "nuxt-start@2.15.8"

COPY --from=INITIAL /var/www/dockerize-nuxt/portal-web/.nuxt /app/.nuxt
COPY --from=INITIAL /var/www/dockerize-nuxt/portal-web/static /app/
COPY --from=INITIAL /var/www/dockerize-nuxt/portal-web/package*.json /app/
COPY --from=INITIAL /var/www/dockerize-nuxt/portal-web/nuxt.config.js /app/
COPY --from=INITIAL /var/www/dockerize-nuxt/portal-web/node_modules/@nuxt /app/node_modules/
COPY --from=INITIAL /var/www/dockerize-nuxt/portal-web/node_modules/@nuxtjs /app/node_modules/
EXPOSE 3000

ENV HOST=0.0.0.0

ENV PORT=3000

ENV API_BASE_URL http://example.com/api

ENV BUCKET_URL http://example.com/bucket

CMD [ "npx", "nuxt-start" ]