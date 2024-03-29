ARG PORTAL_API_URL=https://portal.api.dev.josa.ngo/ ASSETS_BUCKET_URL=https://josa-dev-api.fra1.digitaloceanspaces.com HOST=0.0.0.0 PORT=3000 USER=node MATOMO_SITE_ID=9 BBB_API_URL=https://api.mynaparrot.com/josa/bigbluebutton/api/ BBB_API_SECRET=secret OTS_API_URL=https://ots.josa.ngo/api/v1/ OTS_API_TOKEN=token OTS_FORM_GROUP=test

###########
# BUILDER #
###########
FROM node:16-alpine3.14 as builder

ARG PORTAL_API_URL
ARG ASSETS_BUCKET_URL
ARG HOST
ARG PORT
ARG MATOMO_SITE_ID
ARG BBB_API_URL
ARG BBB_API_SECRET
ARG OTS_API_URL
ARG OTS_API_TOKEN
ARG OTS_FORM_GROUP

# copy build context and install dependencies
WORKDIR /workspace
COPY . .
RUN npm install

# Inject the enviromental variables
ENV PORTAL_API_URL=$PORTAL_API_URL ASSETS_BUCKET_URL=$ASSETS_BUCKET_URL HOST=$HOST PORT=$PORT MATOMO_SITE_ID=$MATOMO_SITE_ID BBB_API_URL=$BBB_API_URL BBB_API_SECRET=$BBB_API_SECRET OTS_API_URL=$OTS_API_URL OTS_API_TOKEN=$OTS_API_TOKEN OTS_FORM_GROUP=$OTS_FORM_GROUP

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
ARG MATOMO_SITE_ID
ARG BBB_API_URL
ARG BBB_API_SECRET
ARG OTS_API_URL
ARG OTS_API_TOKEN
ARG OTS_FORM_GROUP

# copy builder output to project workdir
WORKDIR /app
COPY --from=builder --chown=${USER}:${USER} /workspace/ /app/
COPY --from=builder --chown=${USER}:${USER} /workspace/.nuxt /app/.nuxt

# Inject the enviromental variables
ENV PORTAL_API_URL=$PORTAL_API_URL ASSETS_BUCKET_URL=$ASSETS_BUCKET_URL HOST=$HOST PORT=$PORT MATOMO_SITE_ID=$MATOMO_SITE_ID BBB_API_URL=$BBB_API_URL BBB_API_SECRET=$BBB_API_SECRET OTS_API_URL=$OTS_API_URL OTS_API_TOKEN=$OTS_API_TOKEN OTS_FORM_GROUP=$OTS_FORM_GROUP

# set user context
USER ${USER}

# expose port
EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
