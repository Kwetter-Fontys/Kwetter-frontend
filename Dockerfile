#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build -- --prod

#stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/kwetter /usr/share/nginx/html
EXPOSE 80