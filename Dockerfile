# develop stage
FROM node:18 as develop-stage
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
COPY . .
# build stage
FROM develop-stage as build-stage
RUN yarn
RUN quasar build
#ENTRYPOINT []
#CMD quasar serve

# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
#COPY --from=build-stage /app/data.json /usr/share/nginx/html/data.json
RUN sed -i "s/listen       80;/listen       8838;/g" /etc/nginx/conf.d/default.conf
EXPOSE 8838
CMD ["nginx", "-g", "daemon off;"]

