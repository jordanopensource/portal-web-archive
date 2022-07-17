FROM node:16.13-alpine3.13

# install node_modules
COPY package*.json /tmp/
RUN cd /tmp && npm install

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# move node_modules into application root
RUN mv /tmp/node_modules .

EXPOSE 3000

ENV HOST=0.0.0.0

ENV PORT=3000

ENV API_BASE_URL http://example.com/api

ENV BUCKET_URL http://example.com/bucket

RUN npm run build

CMD [ "npm", "run", "start" ]
