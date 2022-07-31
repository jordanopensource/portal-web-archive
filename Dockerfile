ARG API_BASE_URL=http://example.com/api BUCKET_URL=http://example.com/bucket HOST=0.0.0.0 PORT=3000 BETA_RELEASE=true USER=node

###########
# BUILDER #
###########
FROM node:16-alpine3.14 as builder

ARG API_BASE_URL
ARG BUCKET_URL
ARG HOST
ARG PORT
ARG BETA_RELEASE

# copy build context and install dependencies
WORKDIR /workspace
COPY . .
RUN npm install

# Inject the enviromental variables
ENV API_BASE_URL=${API_BASE_URL} BUCKET_URL=${API_BASE_URL} HOST=${HOST} PORT=${PORT} BETA_RELEASE=${BETA_RELEASE}

RUN npm run build

###########
# PROJECT #
###########
FROM node:16-slim

ARG API_BASE_URL
ARG BUCKET_URL
ARG HOST
ARG PORT
ARG BETA_RELEASE
ARG USER

# copy builder output to project workdir
WORKDIR /app
COPY --from=builder --chown=${USER}:${USER} /workspace/.nuxt /app/.nuxt
COPY --from=builder --chown=${USER}:${USER} /workspace/node_modules /app/node_modules
COPY --from=builder --chown=${USER}:${USER} /workspace/package.json /app/

# set user context
USER ${USER}

# expose port
EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
