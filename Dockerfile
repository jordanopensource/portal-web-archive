ARG PORTAL_API_URL=https://portal.api.dev.josa.ngo/ ASSETS_BUCKET_URL=https://josa-dev-api.fra1.digitaloceanspaces.com HOST=0.0.0.0 PORT=3000 USER=node

###########
# BUILDER #
###########
FROM node:16-alpine3.14 as builder

ARG PORTAL_API_URL
ARG ASSETS_BUCKET_URL
ARG HOST
ARG PORT

# copy build context and install dependencies
WORKDIR /workspace
COPY . .
RUN npm install

# Inject the enviromental variables
ENV PORTAL_API_URL=${PORTAL_API_URL} ASSETS_BUCKET_URL=${PORTAL_API_URL} HOST=${HOST} PORT=${PORT}

RUN npm run build

###########
# PROJECT #
###########
FROM node:16-slim

ARG PORTAL_API_URL
ARG ASSETS_BUCKET_URL
ARG HOST
ARG PORT
ARG USER

# copy builder output to project workdir
WORKDIR /app
COPY --from=builder --chown=${USER}:${USER} /workspace/ /app/
COPY --from=builder --chown=${USER}:${USER} /workspace/.nuxt /app/.nuxt

# Inject the enviromental variables
ENV PORTAL_API_URL=${PORTAL_API_URL} ASSETS_BUCKET_URL=${PORTAL_API_URL} HOST=${HOST} PORT=${PORT}

# set user context
USER ${USER}

# expose port
EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
