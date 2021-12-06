FROM node:16.13-alpine3.13

RUN mkdir -p /var/www/dockerize-nuxt/portal-web
WORKDIR /var/www/dockerize-nuxt/portal-web

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV HOST=0.0.0.0

ENV PORT=3000

ENV API_BASE_URL http://example.com/api

ENV BUCKET_URL http://example.com/bucket

RUN npm run build

CMD [ "npm", "run", "start" ]